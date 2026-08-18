/**
 * Authentication server functions.
 *
 * Provides login, logout, and auth-check endpoints that operate entirely
 * server-side. Credentials are validated against hashed env vars.
 * Sessions are managed via HTTP-only cookies.
 */

import { createServerFn } from "@tanstack/react-start";
import {
  validateCredentials,
  createSession,
  destroySession,
  getSession,
  rateLimitCheck,
  rateLimitRecord,
} from "@/lib/auth";

function getHeaders(event: { node: { req: { headers: Record<string, string | string[] | undefined> } } }): Headers {
  const headers = new Headers();
  const raw = event.node.req.headers;
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") headers.set(key, value);
    else if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
  }
  return headers;
}

function requireSession(headers: Headers, res: { setHeader(name: string, value: string): void }): void {
  const session = getSession(headers);
  if (!session) {
    const error = new Error("Authentication required") as Error & { statusCode?: number };
    error.statusCode = 401;
    throw error;
  }
}

export const login = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (typeof input !== "object" || input === null) {
      throw new Error("Invalid input");
    }
    const { username, password } = input as { username?: string; password?: string };
    if (typeof username !== "string") throw new Error("username is required");
    if (typeof password !== "string") throw new Error("password is required");
    return { username, password };
  })
  .handler(async (ctx: any) => {
    const { data } = ctx;
    const event = ctx.event as { node: { req: { headers: Record<string, string | string[] | undefined> }; res: { setHeader(name: string, value: string): void } } };
    const headers = getHeaders(event);

    // Rate limit check
    const rateResult = rateLimitCheck(headers);
    if (!rateResult.allowed) {
      return {
        success: false as const,
        error: `Too many failed attempts. Please try again in ${rateResult.retryAfter} seconds.`,
      };
    }

    // Validate credentials
    const result = await validateCredentials(data.username, data.password);

    if (!result.valid) {
      rateLimitRecord(headers);
      return {
        success: false as const,
        error: "Invalid username or password",
      };
    }

    // Create session and set cookie
    createSession(event.node.res, result.username!);

    return {
      success: true as const,
      username: result.username,
    };
  });

export const logout = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    const event = ctx.event as { node: { res: { setHeader(name: string, value: string): void } } };
    destroySession(event.node.res);
    return { success: true as const };
  });

export const checkAuth = createServerFn({ method: "GET" })
  .handler(async (ctx: any) => {
    const event = ctx.event as { node: { req: { headers: Record<string, string | string[] | undefined> } } };
    const headers = getHeaders(event);
    const session = getSession(headers);
    if (session) {
      return { authenticated: true as const, username: session.username };
    }
    return { authenticated: false as const };
  });
