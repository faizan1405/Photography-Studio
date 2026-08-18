import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Variant = "ivory" | "marigold" | "green" | "blush" | "mixed" | "minimal" | "wine";

/**
 * Page wrapper: sequential panel-drop reveal of the page's own content blocks.
 */
export function PageShell({
  children,
  floral = "ivory",
  panels = 3,
}: {
  children: ReactNode;
  floral?: Variant;
  panels?: number;
}) {
  void floral;
  const reduce = useReducedMotion();
  return (
    <div className="relative min-h-screen paper">
      {!reduce && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] flex">
          {Array.from({ length: panels }).map((_, i) => (
            <motion.span
              key={i}
              className="h-full flex-1"
              style={{
                background:
                  i % 2 === 0
                    ? "oklch(0.962 0.018 84)"
                    : "oklch(0.918 0.024 80)",
              }}
              initial={{ y: 0 }}
              animate={{ y: "101%" }}
              transition={{
                duration: 1.05,
                delay: 0.15 + i * 0.12,
                ease: EASE,
              }}
            />
          ))}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
