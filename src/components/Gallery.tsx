import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui";
import { galleryCategories, galleryTabs } from "@/lib/gallery-data";

const EASE = [0.16, 1, 0.3, 1] as const;

type TabId = (typeof galleryTabs)[number]["id"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function Gallery() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const displayedPhotos = useMemo(() => {
    if (activeTab === "all") {
      const all = galleryCategories.flatMap((c) => c.photos);
      return shuffle(all);
    }
    const cat = galleryCategories.find((c) => c.id === activeTab);
    return cat ? shuffle(cat.photos) : [];
  }, [activeTab]);

  const noPhotos = displayedPhotos.length === 0;

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
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={[
                "rounded-full px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
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
        <AnimatePresence mode="popLayout">
          {noPhotos ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.35 }}
              className="columns-2 gap-5 sm:columns-3 lg:columns-4"
            >
              {displayedPhotos.map((src, i) => (
                <div key={src} className="mb-5 break-inside-avoid">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: EASE,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Gallery photo ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-[1.5rem] object-cover shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-xl"
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
