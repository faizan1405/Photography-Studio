import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed page hero with a scroll-driven zoom/parallax on the photograph.
 * Used at the top of every page so the site opens the same cinematic way.
 */
export function PageHero({
  src,
  videoSrc,
  alt,
  eyebrow,
  title,
  tagline,
  children,
  height = "h-[78vh] sm:h-[88vh]",
}: {
  src?: string | undefined;
  videoSrc?: string | undefined;
  alt: string;
  eyebrow?: string;
  title: string;
  tagline?: string;
  children?: ReactNode;
  height?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);

  return (
    <section ref={ref} className={`relative w-full overflow-hidden ${height}`}>
      {videoSrc ? (
        <motion.video
          src={videoSrc}
          poster={src}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          style={{ y, scale }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          loading="eager"
          decoding="async"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.30 0.10 22 / 0.42) 0%, oklch(0.30 0.10 22 / 0.12) 38%, oklch(0.26 0.10 22 / 0.62) 100%)",
        }}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end gap-5 px-6 pb-14 text-center sm:pb-20">
        {eyebrow && (
          <motion.p
            className="text-[0.62rem] uppercase tracking-[0.42em] text-champagne"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className="max-w-4xl text-balance font-display text-4xl leading-[1.05] text-cream sm:text-6xl lg:text-[4.4rem]"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: EASE }}
        >
          {title}
        </motion.h1>
        <span className="rule-gold w-24" />
        {tagline && (
          <motion.p
            className="max-w-2xl text-[0.95rem] italic leading-relaxed text-cream/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          >
            {tagline}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
