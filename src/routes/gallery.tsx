import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { ButtonLink } from "@/components/ui";

const R2 = "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev";

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
        src={`${R2}/wedding/DSC05831.jpg`}
        alt="Cinematic frames from a recent Indian wedding celebration"
        eyebrow="Gallery"
        title="Frames from recent celebrations"
        height="h-[92vh]"
      >
        <ButtonLink to="/pre-wedding">Pre Wedding</ButtonLink>
        <ButtonLink to="/wedding-photography" variant="wine">
          Wedding Day
        </ButtonLink>
      </PageHero>

      <Gallery />

      <Footer />
    </PageShell>
  );
}
