/**
 * Server-only authentication utilities.
 *
 * Uses JWT (HS256) for stateless session tokens stored in HTTP-only cookies.
 *
 * CRITICAL: This file MUST only ever be imported from server-side code
 * (createServerFn handlers, src/server.ts, src/start.ts, etc.).
 * Never import into a client component.
 */

import * as nodeCrypto from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

// ─── Constants ──────────────────────────────────────────────────

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const COOKIE_NAME = (process.env as Record<string, string | undefined>)["ADMIN_SESSION_COOKIE"] ?? "admin_session";

// Rate limiter is in-memory (per-instance on Vercel serverless).
// It provides best-effort brute-force protection but is NOT globally
// enforced across Vercel function instances.
const MAX_FAILED_ATTEMPTS = 5;
const FAILED_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const rateLimiter = new Map<string, { attempts: number[]; lockedUntil?: number }>();

// ─── JWT secret ─────────────────────────────────────────────────

function getJwtSecret(): Uint8Array {
  const secret = (process.env as Record<string, string | undefined>)["ADMIN_SESSION_SECRET"];
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET environment variable is not configured");
  }
  if (secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters long");
  }
  return new TextEncoder().encode(secret);
}

// ─── Cookie helpers ─────────────────────────────────────────────

function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  for (const pair of cookieHeader.split(";")) {
    const trimmed = pair.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const name = trimmed.slice(0, eqIdx);
    const value = decodeURIComponent(trimmed.slice(eqIdx + 1));
    cookies[name] = value;
  }
  return cookies;
}

export function getSessionToken(headers: Headers): string | null {
  const cookies = parseCookies(headers.get("cookie"));
  return cookies[COOKIE_NAME] ?? null;
}

export function setSessionCookie(res: { setHeader(name: string, value: string): void }, value: string): void {
  const isProd = (process.env as Record<string, string | undefined>)["NODE_ENV"] === "production";
  const parts = [
    `${COOKIE_NAME}=${value}`,
    `Max-Age=${SESSION_TTL_MS / 1000}`,
    "Path=/",
    "HttpOnly",
    isProd ? "Secure" : "",
    "SameSite=Lax",
  ].filter(Boolean);
  res.setHeader("set-cookie", parts.join("; "));
}

export function clearSessionCookie(res: { setHeader(name: string, value: string): void }): void {
  const isProd = (process.env as Record<string, string | undefined>)["NODE_ENV"] === "production";
  const parts = [
    `${COOKIE_NAME}=`,
    "Max-Age=0",
    "Path=/",
    "HttpOnly",
    isProd ? "Secure" : "",
    "SameSite=Lax",
  ].filter(Boolean);
  res.setHeader("set-cookie", parts.join("; "));
}

// ─── JWT session management ─────────────────────────────────────

interface SessionPayload {
  sub: string;   // username (subject)
  iat: number;   // issued-at (unix seconds)
  exp: number;   // expiration (unix seconds)
}

export async function createSession(res: { setHeader(name: string, value: string): void }, username: string): Promise<string> {
  const secret = getJwtSecret();
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_TTL_MS / 1000)
    .sign(secret);

  setSessionCookie(res, jwt);
  return jwt;
}

export async function getSession(headers: Headers): Promise<{ username: string } | null> {
  const token = getSessionToken(headers);
  if (!token) return null;

  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify<SessionPayload>(token, secret);
    return { username: payload.sub };
  } catch {
    return null;
  }
}

export async function destroySession(res: { setHeader(name: string, value: string): void }): Promise<void> {
  clearSessionCookie(res);
}

// ─── Rate limiting ──────────────────────────────────────────────
//
// NOTE: This rate limiter is in-memory and per-instance. On Vercel
// serverless, different requests may hit different function instances,
// so this is a best-effort layer only — not globally enforced.
// JWT authentication provides the actual access boundary.

function checkRateLimit(headers: Headers): { allowed: boolean; retryAfter?: number } {
  const key = getClientIp(headers);
  const now = Date.now();

  // Cleanup stale entries periodically
  if (Math.random() < 0.1) {
    for (const [ip, entry] of rateLimiter) {
      const lastAttempt = entry.attempts[entry.attempts.length - 1];
      if (entry.attempts.length === 0 || (lastAttempt !== undefined && now - lastAttempt > FAILED_WINDOW_MS)) {
        rateLimiter.delete(ip);
      }
    }
  }

  const entry = rateLimiter.get(key);
  if (!entry) return { allowed: true };

  if (entry.lockedUntil && now < entry.lockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

  entry.attempts = entry.attempts.filter((t) => now - t < FAILED_WINDOW_MS);

  if (entry.attempts.length >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
    return { allowed: false, retryAfter: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
  }

  return { allowed: true };
}

function recordFailedAttempt(headers: Headers): void {
  const key = getClientIp(headers);
  const entry = rateLimiter.get(key) ?? { attempts: [] as number[] };
  entry.attempts.push(Date.now());
  rateLimiter.set(key, entry);
}

export function rateLimitCheck(headers: Headers): { allowed: boolean; retryAfter?: number } {
  return checkRateLimit(headers);
}

export function rateLimitRecord(headers: Headers): void {
  recordFailedAttempt(headers);
}

// ─── Credential validation ──────────────────────────────────────

export async function validateCredentials(
  username: string,
  password: string,
): Promise<{ valid: boolean; username?: string }> {
  const env = process.env as Record<string, string | undefined>;
  const expectedUsername = env["ADMIN_USERNAME"];
  const expectedHash = env["ADMIN_PASSWORD_HASH"];

  if (!expectedUsername || !expectedHash) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD_HASH not configured");
    return { valid: false };
  }

  if (username !== expectedUsername) {
    return { valid: false };
  }

  const passwordOk = await verifyPassword(password, expectedHash);
  if (!passwordOk) return { valid: false };

  return { valid: true, username: expectedUsername };
}

// ─── Password hashing ───────────────────────────────────────────

export function hashPassword(password: string): Promise<string> {
  const salt = nodeCrypto.randomUUID().replace(/-/g, "");
  return new Promise((resolve, reject) => {
    nodeCrypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`scrypt:${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export function verifyPassword(password: string, stored: string): Promise<boolean> {
  return new Promise((resolve) => {
    const parts = stored.split(":");
    if (parts.length !== 3 || parts[0] !== "scrypt") {
      resolve(false);
      return;
    }
    const [, salt, hashHex] = parts;
    if (!salt || !hashHex) {
      resolve(false);
      return;
    }
    nodeCrypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        resolve(false);
        return;
      }
      const derivedHex = derivedKey.toString("hex");
      // Constant-time comparison
      let diff = 0;
      for (let i = 0; i < Math.max(derivedHex.length, hashHex.length); i++) {
        diff |= derivedHex.charCodeAt(i) ^ hashHex.charCodeAt(i);
      }
      resolve(diff === 0);
    });
  });
}

// ─── Auth middleware helper ─────────────────────────────────────

export async function requireAuth(headers: Headers): Promise<{ username: string }> {
  const session = await getSession(headers);
  if (!session) {
    const error = new Error("Authentication required") as Error & { statusCode?: number };
    error.statusCode = 401;
    throw error;
  }
  return { username: session.username };
}
