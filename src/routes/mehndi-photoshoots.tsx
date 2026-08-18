import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { img } from "@/lib/site";
import heroVideo from "@/assets/Haldi_and_Mehendi_Photoshoots.mp4.asset.json";

export const Route = createFileRoute("/mehndi-photoshoots")({
  head: () => ({
    meta: [
      { title: "Mehndi Photoshoots | Clickographers Wedding Films" },
      {
        name: "description",
        content:
          "Mehndi photoshoots and films — henna detail, bridal portraits and family moments through the slow green-and-gold morning before the wedding.",
      },
      { property: "og:title", content: "Mehndi Photoshoots | Clickographers" },
      {
        property: "og:description",
        content:
          "Detail-led mehndi coverage: henna work, jewellery, laughter and light before the wedding day.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      floral="green"
      eyebrow="Mehndi"
      title="Green, gold and the slowest morning"
      tagline="Hours of stillness, hands held out, cousins on the floor, and detail everywhere you look. Mehndi is the most photographic day of the week."
      intro="Mehndi rewards patience and a macro lens. We shoot the henna as it grows across your hands, the jewellery laid out before it's worn, the marigold and the mirrors — and the easy, unguarded family time that only happens on this day."
      hero={img.heroMehndi}
      heroVideo={heroVideo.url}
      heroAlt="Bride having intricate mehndi applied to her hands"
      stories={[
        {
          title: "The henna, frame by frame",
          text: "We photograph the design as it builds — first outline to finished palm — so you keep a record of the artistry, not just the result. Close detail work shot with macro glass and soft window light.",
          image: img.mh2,
          alt: "Finished bridal mehndi detail with gold bangles",
        },
        {
          title: "The room, not just the bride",
          text: "Sisters arguing over songs, a grandmother threading jasmine, plates of food passing over people's heads. The mehndi is where families are most themselves, and that's what we document.",
          image: img.mh3,
          alt: "Bride laughing with her friends at her mehndi",
        },
        {
          title: "Bridal portraits while the henna dries",
          text: "A twenty minute portrait window built into every mehndi package — floral jewellery, green and gold, natural light. These often become the favourite portraits of the entire wedding.",
          image: img.mh4,
          alt: "Bridal portrait in green and gold with floral jewellery",
        },
      ]}
      inclusions={[
        "Macro coverage of henna detail and jewellery",
        "Dedicated bridal portrait window",
        "Candid family and friends documentation",
        "Flat-lay styling of invites and heirlooms",
        "Hand-graded photographs, warm natural tones",
        "Private online gallery to share instantly",
      ]}
      packages={[
        {
          name: "Intimate",
          price: "₹45,000",
          note: "Home mehndi, 4 hours",
          items: [
            "4 hours of coverage",
            "One photographer",
            "120+ edited photographs",
            "Henna and jewellery detail set",
            "Online gallery for 12 months",
          ],
        },
        {
          name: "Complete",
          price: "₹78,000",
          note: "Photo + film, full day",
          featured: true,
          items: [
            "Full-day coverage",
            "Two photographers, one cinematographer",
            "250+ edited photographs",
            "3 minute mehndi film",
            "Bridal portrait session included",
            "Online gallery for 24 months",
          ],
        },
        {
          name: "Haldi & Mehndi",
          price: "₹1,15,000",
          note: "Two functions",
          items: [
            "Haldi and mehndi both covered",
            "Two photographers, two cinematographers",
            "400+ edited photographs",
            "5 minute combined film",
            "Two portrait sessions",
            "Printed 24-spread album",
          ],
        },
      ]}
    />
  ),
});
