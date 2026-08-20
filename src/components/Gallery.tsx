import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, ActionButton } from "@/components/ui";
import { galleryCategories, galleryTabs } from "@/lib/gallery-data";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const PAGE_SIZE = 24;

type TabId = (typeof galleryTabs)[number]["id"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i]!;
    const y = a[j]!;
    a[i] = y;
    a[j] = x;
  }
  return a;
}

function getRevealDelay(index: number): number {
  if (index < 30) return 0.025 * index * Math.log10(index + 1);
  return 0.85 + 0.012 * (index - 30);
}

export function Gallery() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRefs = useRef<Set<Element>>(new Set());

  const shuffledAll = useMemo(() => {
    const all = galleryCategories.flatMap((c) => c.photos);
    return shuffle(all);
  }, []);

  const displayedPhotos = useMemo(() => {
    if (activeTab === "all") return shuffledAll;
    const cat = galleryCategories.find((c) => c.id === activeTab);
    return cat ? shuffle(cat.photos) : [];
  }, [activeTab, shuffledAll]);

  const visiblePhotos = displayedPhotos.slice(0, displayCount);
  const hasMore = displayCount < displayedPhotos.length;

  const resetDisplay = useCallback(() => {
    setDisplayCount(PAGE_SIZE);
    observedRefs.current.clear();
  }, []);

  const noPhotos = displayedPhotos.length === 0;

  const registerObserver = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !observedRefs.current.has(entry.target)) {
                observedRefs.current.add(entry.target);
                (entry.target as HTMLDivElement).style.opacity = "1";
                (entry.target as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                observerRef.current?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: "60px" }
        );
      }

      if (!observedRefs.current.has(el)) {
        observerRef.current.observe(el);
      }
    },
    []
  );

  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
      <SectionHeading
        eyebrow="The Gallery"
        title="Frames from across the week"
        intro="Every ritual, every moment — a living collection from the celebrations we've had the privilege to photograph."
      />

      <div className="mt-14 flex flex-wrap justify-center gap-2 sm:gap-3">
        {galleryTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                resetDisplay();
                setActiveTab(tab.id);
              }}
              aria-pressed={isActive}
              className={[
                "rounded-full px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                isActive
                  ? "bg-wine text-cream"
                  : "bg-cream text-wine hover:bg-champagne border border-wine/20",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-14">
        <AnimatePresence mode="wait">
          {noPhotos ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <p className="font-display text-xl text-wine">
                Photos coming soon
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                We're adding moments from this celebration. Check back shortly or explore other categories.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="columns-2 gap-5 sm:columns-3 lg:columns-4"
            >
              {visiblePhotos.map((src, i) => (
                <div
                  key={src}
                  ref={registerObserver}
                  className="mb-5 break-inside-avoid"
                  style={{
                    opacity: 0,
                    transform: "translateY(24px) scale(0.92)",
                    transition: `opacity 0.65s cubic-bezier(0.25,0.1,0.25,1) ${getRevealDelay(i)}s, transform 0.65s cubic-bezier(0.25,0.1,0.25,1) ${getRevealDelay(i)}s`,
                  }}
                >
                  <img
                    src={src}
                    alt={`Gallery photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-[1.5rem] object-cover shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03] hover:shadow-xl"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <ActionButton
            variant="secondary"
            onClick={() => setDisplayCount((c) => c + PAGE_SIZE)}
          >
            Load more photos ({displayedPhotos.length - displayCount} remaining)
          </ActionButton>
        </div>
      )}
    </section>
  );
}
