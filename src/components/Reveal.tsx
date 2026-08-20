import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

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
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: 1 } : { scale: 1.12, opacity: 0 }}
        transition={{ duration: 1.5, delay, ease: EASE }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          imgClassName={imgClassName}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
      {/* Cream skeleton overlay that fades when image loads */}
      {!loaded && !reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 z-10 bg-cream"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${radius} ring-1 ring-inset ring-gold/25`}
      />
    </div>
  );
}
