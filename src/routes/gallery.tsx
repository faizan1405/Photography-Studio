import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/ui";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Wedding Gallery | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "A gallery of Indian wedding photography by Clickographers. Pre wedding, sangeet, mehndi and wedding day frames from recent celebrations.",
      },
      { property: "og:title", content: "Wedding Gallery | Clickographers Wedding Films" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <PageShell floral="ivory" panels={5}>
      <Header />

      <PageHero
        src=""
        alt=""
        eyebrow="Gallery"
        title="Frames from recent celebrations"
      />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Selected Work"
          title="A new gallery is coming soon"
          intro="We're preparing a fresh collection of Indian wedding photography. In the meantime, ask us directly for a curated selection related to your celebration."
        />
      </section>

      <section className="mx-auto mt-14 max-w-[1400px] px-5 lg:px-16">
        <div className="rounded-[2.25rem] border border-gold/25 bg-card/70 p-10 text-center">
          <p className="font-display text-2xl text-wine">Our gallery is currently being curated.</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Please reach out and we'll share a private selection tailored to your celebration.
          </p>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
