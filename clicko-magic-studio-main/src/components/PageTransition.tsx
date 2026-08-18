import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { pageImage } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic page transition: a warm camera flash fires and the page being
 * opened settles into a small photograph frame before the page appears.
 */
export function PageTransition() {
  const reduce = useReducedMotion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const previous = useRef(pathname);
  const [active, setActive] = useState(false);
  const [shot, setShot] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (reduce) return;
    setShot(pageImage(pathname));
    setActive(true);
    const done = setTimeout(() => setActive(false), 900);
    return () => clearTimeout(done);
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {active && shot && (
        <motion.div
          key="flash"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[75] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <motion.span
            className="absolute inset-0"
            style={{ background: "oklch(0.98 0.02 86)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.94] }}
            transition={{ duration: 0.45, times: [0, 0.3, 1], ease: "easeOut" }}
          />
          <motion.span
            className="relative block overflow-hidden rounded-[1.5rem] border border-gold/60 bg-cream"
            style={{ boxShadow: "var(--shadow-editorial)" }}
            initial={{ width: "88vw", height: "62vh", opacity: 0, scale: 1.04 }}
            animate={{ width: "44vw", height: "34vh", opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <img
              src={shot.src}
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
            />
            <span
              className="absolute inset-x-0 bottom-0 px-4 py-3 text-center text-[0.6rem] uppercase tracking-[0.34em] text-cream"
              style={{
                background:
                  "linear-gradient(180deg, transparent, oklch(0.26 0.10 22 / 0.72))",
              }}
            >
              {shot.label}
            </span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
