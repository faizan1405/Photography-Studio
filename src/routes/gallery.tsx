import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeUp, RevealImage } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { gallery, img } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Wedding Gallery | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "A gallery of Indian wedding photography by Clickographers — pre wedding, sangeet, mehndi and wedding day frames from recent celebrations.",
      },
      { property: "og:title", content: "Wedding Gallery | Clickographers Wedding Films" },
      {
        property: "og:description",
        content: "Selected frames from recent Indian weddings, mehndis, sangeets and pre wedding shoots.",
      },
    ],
  }),
  component: Gallery,
});

const filters = ["All", "Pre Wedding", "Sangeet", "Mehndi", "Wedding Photography", "Ring Ceremony"] as const;

function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  const active = open !== null ? items[open] : undefined;

  return (
    <PageShell floral="ivory" panels={5}>
      <Header />

      <PageHero
        src={img.wd5}
        alt="Bride and groom photographed during their wedding celebration"
        eyebrow="Gallery"
        title="Frames from recent celebrations"
      />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Selected Work"
          title="Every celebration, its own light"
          intro="A small selection from the last few seasons — across pre wedding sessions, mehndi mornings, sangeet nights and wedding days."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setOpen(null);
              }}
              className={`rounded-full border px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.26em] transition-all duration-500 ${
                filter === f
                  ? "border-wine bg-wine text-cream"
                  : "border-gold/40 bg-card/70 text-wine hover:bg-champagne"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1400px] px-5 lg:px-16">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <button
              key={`${g.src}-${i}`}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photograph: ${g.alt}`}
              className="mb-5 block w-full break-inside-avoid text-left"
            >
              <RevealImage
                src={g.src}
                alt={g.alt}
                delay={(i % 3) * 0.05}
                dir={i % 2 === 0 ? "up" : "down"}
                radius="rounded-[1.75rem]"
                className={g.tall ? "aspect-[3/4] w-full" : "aspect-[4/3] w-full"}
              />
            </button>
          ))}
        </div>
        <FadeUp className="mt-10 text-center text-[0.62rem] uppercase tracking-[0.28em] text-gold-deep">
          {items.length} photographs
        </FadeUp>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10"
            style={{ background: "oklch(0.24 0.05 28 / 0.94)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-5 top-5 rounded-full border border-cream/30 p-3 text-cream transition-colors hover:bg-cream/10"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              aria-label="Previous photograph"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => ((i ?? 0) - 1 + items.length) % items.length);
              }}
              className="absolute left-3 rounded-full border border-cream/30 p-3 text-cream transition-colors hover:bg-cream/10 sm:left-8"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next photograph"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => ((i ?? 0) + 1) % items.length);
              }}
              className="absolute right-3 rounded-full border border-cream/30 p-3 text-cream transition-colors hover:bg-cream/10 sm:right-8"
            >
              <ChevronRight size={20} />
            </button>
            <motion.figure
              className="flex max-h-full flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[76vh] w-auto rounded-[1.5rem] object-contain"
              />
              <figcaption className="max-w-xl text-center text-xs tracking-[0.16em] text-cream/75">
                {active.alt} — {active.category}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </PageShell>
  );
}
