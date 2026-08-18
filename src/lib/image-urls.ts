/**
 * Builds public R2 URLs from image keys.
 *
 * This file does NOT import the S3 SDK or any server-only code.
 * It is safe to import from client components.
 *
 * The public base URL is provided via Vite's built-in env injection.
 * Set VITE_R2_PUBLIC_BASE_URL in your Vercel dashboard and .env.local.
 */

function getPublicBaseUrl(): string {
  const url = (import.meta.env as Record<string, string | undefined>)["VITE_R2_PUBLIC_BASE_URL"];
  if (!url) {
    throw new Error(
      "VITE_R2_PUBLIC_BASE_URL is not set. Add it to your Vercel environment variables.",
    );
  }
  return url.replace(/\/$/, "");
}

/**
 * Returns the public URL for an R2 object key.
 */
export function r2Url(key: string): string {
  return `${getPublicBaseUrl()}/${key}`;
}
