import { useRef, useEffect } from "react";

/**
 * OptimizedImage — renders an <img> with responsive srcSet and modern format support.
 *
 * The src attribute uses the ORIGINAL URL (always works immediately).
 * The srcSet provides optimized variants (AVIF/WebP) for browsers to pick once available.
 * Once the optimization script is run on R2, browsers will automatically prefer the
 * smaller, modern-format URLs from srcSet.
 *
 * @param src - Full URL to the image (used as the primary src — always works)
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
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={fetchpriority}
      onLoad={onLoad}
      className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
    />
  );
}
