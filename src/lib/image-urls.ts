/**
 * Centralized R2 image URL helpers.
 *
 * Optimized images are uploaded under the `optimized/` prefix in the R2 bucket.
 * Each image gets width-suffixed variants: {name}.{width}w.{format}
 * Formats: avif, webp, jpg
 */

export const R2_BASE = "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev";

/**
 * Build a path like "pre-wedding/DSC_0644.1200w.webp" from a base image path.
 *
 * @param imagePath - The path portion after the R2 base, WITHOUT the original extension
 *   e.g. "pre-wedding/DSC_0644" (not "pre-wedding/DSC_0644.jpg")
 * @param width - Target width in pixels (e.g. 800, 1200, 1600)
 * @param format - Output format: "avif" | "webp" | "jpg"
 */
export function optimizedUrl(imagePath: string, width: number, format: "avif" | "webp" | "jpg" = "webp"): string {
  // Strip any existing extension from imagePath
  const base = imagePath.replace(/\.\w+$/, "");
  return `${R2_BASE}/optimized/${base}.${width}w.${format}`;
}

/**
 * Generate srcset string for responsive images.
 * Provides 3 breakpoints: 800w (mobile), 1200w (tablet), 1600w (desktop).
 */
export function responsiveSrcSet(imagePath: string): string {
  const base = imagePath.replace(/\.\w+$/, "");
  return [
    `${R2_BASE}/optimized/${base}.800w.avif 800w`,
    `${R2_BASE}/optimized/${base}.1200w.avif 1200w`,
    `${R2_BASE}/optimized/${base}.1600w.avif 1600w`,
    `${R2_BASE}/optimized/${base}.800w.webp 800w`,
    `${R2_BASE}/optimized/${base}.1200w.webp 1200w`,
    `${R2_BASE}/optimized/${base}.1600w.webp 1600w`,
    `${R2_BASE}/optimized/${base}.1200w.jpg 1200w`,
  ].join(", ");
}

/**
 * Default sizes attribute for image containers.
 * Adjust based on actual CSS layout needs.
 */
export const defaultImageSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 55vw";
