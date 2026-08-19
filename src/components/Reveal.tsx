import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type Dir = "left" | "right" | "up" | "down";

const maskExit: Record<Dir, { x?: string; y?: string }> = {
  left: { x: "-101%" },
  right: { x: "101%" },
  up: { y: "-101%" },
  down: { y: "101%" },
};

export function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  radius = "rounded-[2.25rem]",
  dir = "left",
  delay = 0,
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  radius?: string;
  dir?: Dir;
  delay?: number;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`group photo-frame relative overflow-hidden ${radius} bg-cream ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.5, delay, ease: EASE }}
        className={`h-full w-full object-cover will-change-transform photo-hover ${imgClassName} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      {!loaded && !reduce && (
        <span className="absolute inset-0 z-10 bg-cream" />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${radius} ring-1 ring-inset ring-gold/25`}
      />
    </div>
  );
}
