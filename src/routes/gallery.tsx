import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";

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
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <PageShell floral="ivory" panels={5}>
      <Header />

      <PageHero
        src=""
        alt=""
        eyebrow="Gallery"
        title="Frames from recent celebrations"
      />

      <Gallery />

      <Footer />
    </PageShell>
  );
}
