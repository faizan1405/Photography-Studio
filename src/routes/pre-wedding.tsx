import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { img, video } from "@/lib/site";

export const Route = createFileRoute("/pre-wedding")({
  head: () => ({
    meta: [
      { title: "Pre Wedding Photoshoots | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "Pre wedding photoshoots and portrait films in palaces, fields and city corners. Packages, inclusions and pricing from Clickographers, Noida.",
      },
      { property: "og:title", content: "Pre Wedding Photoshoots | Clickographers" },
      {
        property: "og:description",
        content:
          "Unhurried pre wedding portrait sessions and short films, shot in locations chosen for you.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      floral="blush"
      eyebrow="Pre Wedding"
      title="A quiet day, just the two of you"
      tagline="Before the guests arrive, before the schedule takes over — one unhurried day for the two of you in front of the camera."
      intro="Pre wedding sessions are where couples get comfortable with us. We scout locations for light, plan a loose route through the day, and let the shoot breathe. You'll leave with a portrait set and a short film you'll want to play at the sangeet."
      hero=""
      heroVideo=""
      heroAlt="Indian couple walking through a palace courtyard during their pre wedding shoot"
      stories={[
        {
          title: "Locations chosen for you, not for the algorithm",
          text: "Havelis in Jaipur, mustard fields outside Delhi, a rooftop terrace at blue hour, or the street where you first met. We scout in advance and build a route that flows with the light rather than fighting it.",
          image: "",
          alt: "Couple embracing in a mustard field at sunset",
        },
        {
          title: "Direction that feels like conversation",
          text: "We don't hand you poses. We give you something to do together — walk, whisper, react — and photograph what happens in between. That's where the frames you'll actually frame come from.",
          image: "",
          alt: "Couple laughing together on stone steps beside a lake",
        },
        {
          title: "A short film to open your wedding week",
          text: "Every pre wedding package includes a sixty to ninety second cinematic edit, graded and scored, ready to project at your sangeet or send with your invitations.",
          image: "",
          alt: "Close portrait of a couple with foreheads touching",
        },
      ]}
      inclusions={[
        "Pre-shoot consultation and location scouting",
        "Lead photographer plus assisted lighting",
        "Wardrobe and timeline guidance",
        "Hand-graded high resolution photographs",
        "Cinematic short film, 60–90 seconds",
        "Private online gallery to share with family",
      ]}
      packages={[
        {
          name: "Half Day",
          price: "₹65,000",
          note: "One location, 4 hours",
          items: [
            "4 hours of coverage",
            "One location, two outfits",
            "60+ edited photographs",
            "30 second teaser reel",
            "Online gallery for 12 months",
          ],
        },
        {
          name: "Full Day",
          price: "₹1,10,000",
          note: "Two locations, 8 hours",
          featured: true,
          items: [
            "8 hours of coverage",
            "Two locations, three outfits",
            "150+ edited photographs",
            "90 second cinematic film",
            "20-page fine-art photobook",
            "Online gallery for 24 months",
          ],
        },
        {
          name: "Destination",
          price: "₹1,85,000",
          note: "Two days, on location",
          items: [
            "Two shooting days",
            "Unlimited locations at the destination",
            "250+ edited photographs",
            "3 minute destination film",
            "Drone coverage where permitted",
            "Travel planning handled by us",
          ],
        },
      ]}
    />
  ),
});
