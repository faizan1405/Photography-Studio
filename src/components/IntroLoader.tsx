import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 80;
const PRELOAD_TIMEOUT_MS = 4000;
const FADE_OUT_MS = 600;
const SAFETY_TIMEOUT_MS = 8000;

const PHOTOS = [
  "/assets/haldi-mehendi/DSC00187.webp",
  "/assets/haldi-mehendi/DSC00213.webp",
  "/assets/haldi-mehendi/DSC00218.webp",
  "/assets/haldi-mehendi/DSC00430.webp",
  "/assets/haldi-mehendi/DSC00451.webp",
  "/assets/haldi-mehendi/DSC00469.webp",
  "/assets/haldi-mehendi/DSC00660.webp",
  "/assets/haldi-mehendi/DSC00664.webp",
  "/assets/haldi-mehendi/DSC01146.webp",
  "/assets/haldi-mehendi/DSC01156.webp",
  "/assets/haldi-mehendi/DSC01158.webp",
  "/assets/haldi-mehendi/DSC01257.webp",
  "/assets/haldi-mehendi/DSC01283.webp",
  "/assets/haldi-mehendi/DSC01305.webp",
  "/assets/haldi-mehendi/DSC01351.webp",
  "/assets/haldi-mehendi/DSC01361.webp",
  "/assets/haldi-mehendi/DSC01375.webp",
  "/assets/haldi-mehendi/DSC01433.webp",
  "/assets/haldi-mehendi/DSC01434.webp",
  "/assets/haldi-mehendi/DSC01548.webp",
  "/assets/haldi-mehendi/DSC01562.webp",
  "/assets/haldi-mehendi/DSC01574.webp",
  "/assets/haldi-mehendi/DSC01577.webp",
  "/assets/haldi-mehendi/DSC01578.webp",
  "/assets/haldi-mehendi/DSC01621.webp",
  "/assets/haldi-mehendi/DSC01789.webp",
  "/assets/haldi-mehendi/DSC01875.webp",
  "/assets/haldi-mehendi/DSC01905.webp",
  "/assets/haldi-mehendi/IMG_7303.webp",
  "/assets/haldi-mehendi/IMG_7318.webp",
  "/assets/haldi-mehendi/IMG_7340.webp",
  "/assets/haldi-mehendi/IMG_7419.webp",
  "/assets/haldi-mehendi/IMG_7425.webp",
  "/assets/haldi-mehendi/IMG_7431.webp",
  "/assets/haldi-mehendi/IMG_7433.webp",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Overlay splash: 35 wedding photos rapidly stack on top of each other
 * (every 80 ms), then the overlay fades out so the homepage is revealed.
 * Multiple safety timers guarantee the splash never permanently blocks
 * the site, even if preloading hangs.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [imageCount, setImageCount] = useState(0);
  const [phase, setPhase] = useState<"montage" | "fade">("montage");

  useEffect(() => {
    if (reduce) {
      setPhase("fade");
      const t = window.setTimeout(onDone, 200);
      return () => window.clearTimeout(t);
    }

    let doneCalled = false;
    const finish = () => {
      if (doneCalled) return;
      doneCalled = true;
      setPhase("fade");
      window.setTimeout(onDone, FADE_OUT_MS + 20);
    };

    // Hard safety net: never let the splash block the page longer than this.
    const safety = window.setTimeout(finish, SAFETY_TIMEOUT_MS);

    const run = async () => {
      // Start montage immediately — don't block on all 35 preloads.
      // Preload in background so images are ready when they appear in the montage.
      PHOTOS.forEach((p) => {
        const img = new Image();
        img.onload = () => {};
        img.onerror = () => {};
        img.src = p;
      });

      for (let i = 0; i < PHOTOS.length; i++) {
        await new Promise<void>((resolve) => {
          window.setTimeout(() => {
            setImageCount(i + 1);
            resolve();
          }, SLIDE_INTERVAL_MS);
        });
      }

      finish();
    };

    run();

    return () => {
      window.clearTimeout(safety);
    };
  }, [reduce, onDone]);

  const displayed = PHOTOS.slice(0, imageCount);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      initial={false}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: FADE_OUT_MS / 1000, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === "fade") onDone();
      }}
      style={{
        background: "linear-gradient(145deg, oklch(0.983 0.011 88) 0%, oklch(0.962 0.018 84) 50%, oklch(0.918 0.024 80) 100%)",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
      aria-hidden={phase === "fade"}
    >
      <div
        className="relative"
        style={{
          width: "min(85vw, 380px)",
          height: "min(72vh, 500px)",
        }}
      >
        {displayed.map((src, i) => {
          const isLast = i === displayed.length - 1;
          const rotation = Math.sin(i * 2.7) * 3.5;
          const offsetX = Math.cos(i * 1.3) * 5;
          const offsetY = Math.sin(i * 1.9) * 3;

          return (
            <div
              key={src}
              style={{
                position: "absolute",
                inset: 0,
                transform:
                  "rotate(" +
                  rotation.toFixed(2) +
                  "deg) translate(" +
                  offsetX.toFixed(1) +
                  "px, " +
                  offsetY.toFixed(1) +
                  "px)",
                zIndex: i + 1,
              }}
            >
              <motion.img
                src={src}
                alt=""
                aria-hidden
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{
                  opacity: isLast ? 0.92 : 0.5,
                  scale: isLast ? 1 : 0.95,
                }}
                transition={{ duration: 0.28, ease: EASE }}
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
                style={{
                  boxShadow: "0 25px 60px -20px oklch(0.362 0.121 20 / 0.45), 0 0 0 1px oklch(0.918 0.024 80 / 0.5)",
                }}
              />
            </div>
          );
        })}

        <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
          <img src="/assets/logo.png" alt="Clickographers Wedding Films" className="h-10 w-auto opacity-20" />
        </div>
      </div>
    </motion.div>
  );
}
