import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SectionHeading } from "@/components/ui";
import { FadeUp, RevealImage } from "@/components/Reveal";

const ringPhotos = [
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC00098 copy.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC01222.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC01224 edit.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC01244.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC01340.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC01390.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC02833.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC02840.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC02844.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC02854.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC03023.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC03037.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC03675.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08330.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08331.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08353.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08356.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08360.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08399.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08442.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08445.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08451.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08464.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08691.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08697.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08845.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08848.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08859.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/IMG_9497.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/IMG_9508.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/IMG_9813.jpg",
  "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/IMG_9903.jpg",
];

function RingGallery() {
  return (
    <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
      <SectionHeading
        eyebrow="Ring Ceremony"
        title="Ring ceremony photographs"
        intro="The ring, the exchange, the families — every frame from the first public promise."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ringPhotos.map((src, i) => (
          <RevealImage
            key={src}
            src={src}
            alt={`Ring ceremony photo ${i + 1}`}
            delay={i * 0.04}
            radius="rounded-[1.75rem]"
            className={i % 5 === 0 ? "aspect-[3/4] w-full" : "aspect-[4/5] w-full"}
          />
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/ring-ceremony")({
  head: () => ({
    meta: [
      { title: "Ring Ceremony Photography | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "Ring ceremony photography and films — the first public promise, captured with warmth and detail by Clickographers, Noida.",
      },
      { property: "og:title", content: "Ring Ceremony Photography | Clickographers" },
      {
        property: "og:description",
        content:
          "The ring ceremony is where it all becomes real. We photograph the exchange, the families, the laughter and the quiet glances.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      floral="blush"
      eyebrow="Ring Ceremony"
      title="The first promise, made visible"
      tagline="The moment the ring goes on — and everything around it. Families coming together, tears held back, and the quiet start of everything to come."
      intro="The ring ceremony marks the first public promise between two families. We cover it with the same care we bring to every chapter — capturing the exchange, the reactions, the jewellery, the decor, and the easy, unguarded moments that only happen when families meet for the first time in this way."
      hero="https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08445.jpg"
      heroVideo=""
      heroAlt="Close-up of a ring exchange during an Indian ring ceremony"
      stories={[
        {
          title: "The exchange, held in close-up",
          text: "We photograph the ring going on with macro attention — the metal, the fingers, the look between the couple. These are the frames that become the first page of your wedding album.",
          image: "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08451.jpg",
          alt: "Bride and groom exchanging rings during the ceremony",
        },
        {
          title: "Two families, one frame",
          text: "The ring ceremony is as much about the families as it is about the couple. We move between wide group moments and the small, private reactions that only happen when nobody is performing.",
          image: "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08442.jpg",
          alt: "Family gathered together during a ring ceremony celebration",
        },
        {
          title: "Detail that tells the story",
          text: "The mandap, the invitations, the jewellery laid out, the flowers — every detail frames the day. We shoot it all with the same hand-graded warmth you'll recognise in every frame we deliver.",
          image: "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/ring/DSC08330.jpg",
          alt: "Close detail of wedding rings and floral decor",
        },
      ]}
      inclusions={[
        "Pre-ceremony consultation and timeline planning",
        "Lead photographer with assisted lighting",
        "Macro coverage of the ring exchange and jewellery",
        "Family and group portraits throughout the event",
        "Hand-graded high resolution photographs",
        "Private online gallery to share with family",
      ]}
      packages={[
        {
          name: "Essential",
          price: "₹45,000",
          note: "Ceremony coverage, 3 hours",
          items: [
            "3 hours of coverage",
            "One lead photographer",
            "80+ edited photographs",
            "Online gallery for 12 months",
          ],
        },
        {
          name: "Complete",
          price: "₹78,000",
          note: "Full event, photo + film",
          featured: true,
          items: [
            "Full event coverage, up to 6 hours",
            "One photographer, one cinematographer",
            "200+ edited photographs",
            "2 minute ring ceremony film",
            "Family portrait session included",
            "Online gallery for 24 months",
          ],
        },
        {
          name: "Combined",
          price: "₹1,20,000",
          note: "Ring + mehndi or sangeet",
          items: [
            "Two-day coverage",
            "Ring ceremony plus one additional event",
            "Two photographers, two cinematographers",
            "400+ edited photographs",
            "5 minute combined film",
            "Printed 20-spread album",
          ],
        },
      ]}
      extraContent={<RingGallery />}
    />
  ),
});
