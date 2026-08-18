import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { montage } from "@/lib/site";
import logo from "@/assets/logo.png";

const EASE = [0.16, 1, 0.3, 1] as const;

const drift = [
  { x: -160, y: 90, r: -6 },
  { x: 170, y: -80, r: 5 },
  { x: -120, y: -110, r: 4 },
  { x: 140, y: 120, r: -5 },
  { x: 0, y: 160, r: 2 },
  { x: -190, y: 0, r: -3 },
  { x: 190, y: 30, r: 3 },
  { x: 20, y: -170, r: -2 },
];

/**
 * Opening sequence: rapid wedding-photograph montage behind the logo,
 * then the frames scatter away and the love curtains open.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"montage" | "clear" | "fade">("montage");

  useEffect(() => {
    if (reduce) {
      setPhase("fade");
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const tick = setInterval(() => setIndex((i) => i + 1), 105);
    const clear = setTimeout(() => {
      clearInterval(tick);
      setPhase("clear");
    }, 2150);
    const curtain = setTimeout(() => setPhase("fade"), 2500);
    const done = setTimeout(onDone, 3200);
    return () => {
      clearInterval(tick);
      clearTimeout(clear);
      clearTimeout(curtain);
      clearTimeout(done);
    };
  }, [onDone, reduce]);

  const visible = montage.slice(Math.max(0, index - 2), index + 1);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-cream paper"
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <AnimatePresence>
        {phase === "montage" &&
          visible.map((src, i) => {
            const abs = Math.max(0, index - 2) + i;
            const d = drift[abs % drift.length]!;
            return (
              <motion.img
                key={`${src}-${abs}`}
                src={src}
                alt=""
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[42vh] w-[62vw] max-w-[560px] rounded-[1.75rem] object-cover sm:h-[52vh] sm:w-[40vw]"
                style={{ boxShadow: "var(--shadow-editorial)" }}
                initial={{
                  opacity: 0,
                  x: `calc(-50% + ${d.x}px)`,
                  y: `calc(-50% + ${d.y}px)`,
                  scale: 0.86,
                  rotate: d.r,
                }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  y: "-50%",
                  scale: 1,
                  rotate: d.r * 0.25,
                }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.42, ease: EASE }}
              />
            );
          })}
      </AnimatePresence>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6"
        animate={{ opacity: phase === "fade" ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src={logo}
          alt="Clickographers Wedding Films"
          className="w-[400px] max-w-[86vw] drop-shadow-[0_18px_40px_rgba(80,20,20,0.28)] sm:w-[560px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
        />
        <div className="flex flex-col items-center gap-3 rounded-full bg-ivory/70 px-6 py-3 backdrop-blur-sm">
          <p className="eyebrow">Capturing Moments…</p>
          <span className="relative block h-[2px] w-40 overflow-hidden bg-beige">
            <motion.span
              className="absolute inset-y-0 left-0 bg-wine"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>

    </motion.div>
  );
}
