import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Opening sequence: logo fade-in then curtains open.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"logo" | "fade">("logo");

  useEffect(() => {
    if (reduce) {
      setPhase("fade");
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const curtain = setTimeout(() => setPhase("fade"), 1800);
    const done = setTimeout(onDone, 2400);
    return () => {
      clearTimeout(curtain);
      clearTimeout(done);
    };
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-cream"
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 px-6"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <h1 className="font-display text-3xl text-wine sm:text-4xl">{brand.name}</h1>
        <p className="eyebrow">Loading…</p>
      </motion.div>
    </motion.div>
  );
}
