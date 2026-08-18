/**
 * Builds public R2 URLs from image keys.
 *
 * This file does NOT import the S3 SDK or any server-only code.
 * It is safe to import from client components.
 *
 * The public base URL is provided via Vite's built-in env injection.
 * Set VITE_R2_PUBLIC_BASE_URL in your Vercel dashboard and .env.local.
 */

let cachedBase: string | null = null;

function getPublicBaseUrl(): string {
  if (cachedBase) return cachedBase;
  const url = (import.meta.env as Record<string, string | undefined>)["VITE_R2_PUBLIC_BASE_URL"];
  cachedBase = url ? url.replace(/\/$/, "") : "";
  return cachedBase;
}

/**
 * Returns the public URL for an R2 object key.
 * Falls back to a plain key-based path when the base URL is not configured,
 * so the site does not crash before env vars are set.
 */
export function r2Url(key: string): string {
  const base = getPublicBaseUrl();
  if (!base) return key;
  return `${base}/${key}`;
}
