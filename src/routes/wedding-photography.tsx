import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

const R2 = "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev";

export const Route = createFileRoute("/wedding-photography")({
  head: () => ({
    meta: [
      { title: "Wedding Photography & Films | Clickographers, Noida" },
      {
        name: "description",
        content:
          "Full wedding day photography and cinematography — varmala, pheras, kanyadaan and vidaai, documented by Clickographers Wedding Films, Noida.",
      },
      { property: "og:title", content: "Wedding Photography & Films | Clickographers" },
      {
        property: "og:description",
        content:
          "Two lead photographers and a film crew documenting your wedding day from getting ready to vidaai.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      floral="wine"
      eyebrow="Wedding Photography"
      title="From the first varmala to the last goodbye"
      tagline="The day itself. Fire, flowers, hands, tears and a thousand people — held together in photographs and one film you'll watch every anniversary."
      intro="Wedding day coverage is our core work. Two lead photographers, a dedicated cinematography team, and a ritual-by-ritual plan built with your pandit's timeline. We know when the varmala lands and where to stand for the kanyadaan, so nothing is caught from behind a shoulder."
      hero={`${R2}/wedding/DSC05831.jpg`}
      heroVideo={video.wedding}
      heroAlt="Bride and groom exchanging varmala garlands"
      stories={[
        {
          title: "Rituals covered by people who know them",
          text: "Baraat, varmala, kanyadaan, pheras, sindoor, vidaai — each has one right position and one right second. We build the shot plan with your family and pandit so we're already there when it happens.",
          image: `${R2}/wedding/DSC07087.jpg`,
          alt: "Bride and groom performing the pheras around the sacred fire",
        },
        {
          title: "Portraits that belong in a frame",
          text: "A protected portrait window for the couple, and separate sittings for both families. Lit properly, composed carefully, and finished in a warm editorial grade you'll still love in twenty years.",
          image: `${R2}/wedding/DSC06709.jpg`,
          alt: "Bridal portrait in a red and gold lehenga",
        },
        {
          title: "The vidaai, handled gently",
          text: "The hardest hour of the day is covered quietly, from a distance, with long lenses. No flash in anyone's face — just the truth of it, kept for later.",
          image: `${R2}/wedding/DSC06857.jpg`,
          alt: "Emotional vidaai moment between bride and her mother",
        },
      ]}
      inclusions={[
        "Ritual-by-ritual shot plan with your family",
        "Two lead photographers on the day",
        "Dedicated cinematography team",
        "Protected couple and family portrait windows",
        "Hand-graded photographs in a warm editorial tone",
        "Cinematic wedding film, scored and colour graded",
      ]}
      packages={[
        {
          name: "Wedding Day",
          price: "₹1,25,000",
          note: "Photography only",
          items: [
            "Full wedding day, up to 12 hours",
            "Two lead photographers",
            "500+ edited photographs",
            "Couple and family portrait sessions",
            "Online gallery for 12 months",
          ],
        },
        {
          name: "Photo & Film",
          price: "₹2,45,000",
          note: "Our most booked package",
          featured: true,
          items: [
            "Full wedding day, unlimited hours",
            "Two photographers, two cinematographers",
            "800+ edited photographs",
            "10 minute cinematic wedding film",
            "90 second teaser within 72 hours",
            "40-spread fine-art heirloom album",
          ],
        },
        {
          name: "Wedding Week",
          price: "₹4,50,000",
          note: "Every function covered",
          items: [
            "Mehndi, haldi, sangeet, wedding, reception",
            "Three photographers, three cinematographers",
            "1500+ edited photographs",
            "Feature-length film plus per-event edits",
            "Same-day edit screened at the reception",
            "Two heirloom albums and parent copies",
          ],
        },
      ]}
    />
  ),
});
