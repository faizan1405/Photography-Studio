import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SectionHeading } from "@/components/ui";
import { RevealImage } from "@/components/Reveal";
import { galleryCategories } from "@/lib/gallery-data";

import { R2_BASE } from "@/lib/image-urls";

const ringCeremonyCategory = galleryCategories.find((c) => c.id === "ring-ceremony");

function SangeetGallery() {
  return (
    <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
      <SectionHeading
        eyebrow="Sangeet"
        title="Sangeet photographs"
        intro="The stage, the choreography, the coloured light and the loudest night of the wedding week."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(ringCeremonyCategory?.photos ?? []).map((src, i) => (
          <RevealImage
            key={src}
            src={src}
            alt={`Sangeet photo ${i + 1}`}
            delay={i * 0.04}
            radius="rounded-[1.75rem]"
            className={i % 5 === 0 ? "aspect-[3/4] w-full" : "aspect-[4/5] w-full"}
          />
        ))}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/sangeet")({
  head: () => ({
    meta: [
      { title: "Sangeet Photography & Films | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "Sangeet night photography and cinematography — performances, family choreography and stage lighting, covered by Clickographers, Noida.",
      },
      { property: "og:title", content: "Sangeet Photography & Films | Clickographers" },
      {
        property: "og:description",
        content:
          "Stage-lit sangeet coverage: performances, reactions and the loudest night of the wedding week.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      floral="marigold"
      eyebrow="Sangeet"
      title="The loudest night of the week"
      tagline="Months of secret rehearsals, one stage, and a family that finally lets go. Sangeet is chaos — our job is to catch it cleanly."
      intro="Sangeet is the hardest night to shoot well: fast movement, coloured stage light, and moments that never repeat. We cover it with multiple photographers and cinematographers, our own lighting, and a plan built from your run-of-show."
      hero={`${R2_BASE}/ring/IMG_9813.jpg`}
      heroVideo=""
      heroAlt="Bride and groom dancing together on the sangeet stage"
      stories={[
        {
          title: "Every performance, start to finish",
          text: "We work from your rehearsal order so nobody's routine is missed. Wide stage coverage, tight expression frames, and the audience reacting — cut together so the night plays back in sequence.",
          image: `${R2_BASE}/ring/DSC08353.jpg`,
          alt: "Dancer twirling in a shimmering lehenga on the sangeet stage",
        },
        {
          title: "Lighting that flatters, not flattens",
          text: "Coloured LED washes destroy skin tones. We bring our own soft key lighting and balance it against the stage design, so faces stay warm and true while the decor keeps its drama.",
          image: `${R2_BASE}/ring/DSC08445.jpg`,
          alt: "Sangeet stage decor with marigold strings and hanging lanterns",
        },
        {
          title: "The part nobody remembers clearly",
          text: "After the performances, when the aunties take the floor and the groom's friends lose the plot — that's usually the footage couples rewatch most. We stay until the music stops.",
          image: `${R2_BASE}/ring/DSC08451.jpg`,
          alt: "Groom laughing during a family dance performance",
        },
      ]}
      inclusions={[
        "Run-of-show planning call before the night",
        "Two photographers and one cinematographer minimum",
        "Studio lighting balanced to your stage design",
        "Full performance coverage, no routine missed",
        "Hand-graded photographs and a music-cut film",
        "Private online gallery for the whole family",
      ]}
      packages={[
        {
          name: "Essential",
          price: "₹55,000",
          note: "Photography only",
          items: [
            "Up to 6 hours of coverage",
            "Two photographers",
            "200+ edited photographs",
            "Supplementary lighting included",
            "Online gallery for 12 months",
          ],
        },
        {
          name: "Signature",
          price: "₹95,000",
          note: "Photo + film",
          featured: true,
          items: [
            "Full-night coverage",
            "Two photographers, two cinematographers",
            "350+ edited photographs",
            "4–5 minute sangeet film",
            "60 second highlight reel in 48 hours",
            "Online gallery for 24 months",
          ],
        },
        {
          name: "Grand",
          price: "₹1,45,000",
          note: "Multi-camera production",
          items: [
            "Full-night coverage plus cocktail hour",
            "Three photographers, three cinematographers",
            "500+ edited photographs",
            "8 minute multi-camera sangeet film",
            "Same-night reel for social media",
            "Printed 30-spread sangeet album",
          ],
        },
      ]}
      extraContent={<SangeetGallery />}
    />
  ),
});
