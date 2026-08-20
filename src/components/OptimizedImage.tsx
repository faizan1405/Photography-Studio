import { optimizedUrl, responsiveSrcSet, defaultImageSizes } from "@/lib/image-urls";
import { useRef, useEffect } from "react";

/**
 * OptimizedImage — renders a <picture> element with AVIF/WebP/JPG fallbacks.
 *
 * The <img> src is the ORIGINAL URL (always works immediately).
 * The <source> tags and srcSet point to optimized variants on R2.
 * Once the optimization script runs, browsers automatically pick the best format.
 *
 * @param src - Full URL to the image (used as fallback and for base path derivation)
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fetchpriority,
  sizes,
  imgClassName = "",
  priority = false,
  onLoad,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fetchpriority?: "high" | "low" | "auto";
  sizes?: string;
  imgClassName?: string;
  priority?: boolean;
  onLoad?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Derive the base path from the full URL: strip domain, slashes, and extension
  const basePath = src
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/\.\w+$/, "");

  useEffect(() => {
    if (!onLoad) return;
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) { onLoad(); return; }
    const handler = () => { onLoad(); };
    img.addEventListener("load", handler);
    return () => img.removeEventListener("load", handler);
  }, [onLoad]);

  return (
    <picture>
      {/* AVIF source — browser uses if supported and file exists */}
      <source
        srcSet={optimizedUrl(basePath, 1600, "avif")}
        type="image/avif"
      />
      {/* WebP source — browser uses if supported and file exists */}
      <source
        srcSet={optimizedUrl(basePath, 1600, "webp")}
        type="image/webp"
      />
      {/* Fallback img — uses the original URL (always works) with srcset for optimized variants */}
      <img
        ref={imgRef}
        src={src}
        srcSet={responsiveSrcSet(basePath)}
        sizes={sizes ?? defaultImageSizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={fetchpriority}
        onLoad={onLoad}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </picture>
  );
}
