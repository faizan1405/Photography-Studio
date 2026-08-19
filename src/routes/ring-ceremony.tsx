import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { img, video } from "@/lib/site";

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
      hero="/ring/DSC08445.jpg"
      heroVideo=""
      heroAlt="Close-up of a ring exchange during an Indian ring ceremony"
      stories={[
        {
          title: "The exchange, held in close-up",
          text: "We photograph the ring going on with macro attention — the metal, the fingers, the look between the couple. These are the frames that become the first page of your wedding album.",
          image: "/ring/DSC08451.jpg",
          alt: "Bride and groom exchanging rings during the ceremony",
        },
        {
          title: "Two families, one frame",
          text: "The ring ceremony is as much about the families as it is about the couple. We move between wide group moments and the small, private reactions that only happen when nobody is performing.",
          image: "/ring/DSC08442.jpg",
          alt: "Family gathered together during a ring ceremony celebration",
        },
        {
          title: "Detail that tells the story",
          text: "The mandap, the invitations, the jewellery laid out, the flowers — every detail frames the day. We shoot it all with the same hand-graded warmth you'll recognise in every frame we deliver.",
          image: "/ring/DSC08330.jpg",
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
    />
  ),
});
