import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeUp, RevealImage } from "@/components/Reveal";
import { OptimizedImage } from "@/components/OptimizedImage";
import { ButtonLink, SectionHeading, ActionButton } from "@/components/ui";
import { img, serviceLinks } from "@/lib/site";

import { R2_BASE } from "@/lib/image-urls";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Wedding Photography Services & Packages | Clickographers" },
      {
        name: "description",
        content:
          "Pre wedding shoots, sangeet, mehndi and full wedding day coverage. Explore Clickographers wedding photography and film packages with transparent pricing.",
      },
      { property: "og:title", content: "Wedding Photography Services & Packages" },
      {
        property: "og:description",
        content:
          "Photography and cinematography packages for pre wedding, sangeet, mehndi and wedding day coverage.",
      },
    ],
  }),
  component: Services,
});

const cards = [
  {
    ...serviceLinks[2],
    image: `${R2_BASE}/assets/haldi-mehendi/DSC00664.webp`,
    alt: "Bride having mehndi applied before her wedding",
    from: "₹45,000",
    text: "Detail-led coverage of the mehndi morning — henna work, jewellery, family and light.",
  },
  {
    ...serviceLinks[0],
    image: `${R2_BASE}/pre-wedding/DSC_0644.jpg`,
    alt: "Couple during a pre wedding shoot in a palace courtyard",
    from: "₹65,000",
    text: "A half or full day portrait session in locations chosen for you, plus a short film.",
  },
  {
    ...serviceLinks[1],
    image: `${R2_BASE}/ring/IMG_9813.jpg`,
    alt: "Sangeet night performance with bride and groom dancing",
    from: "₹55,000",
    text: "Stage-lit coverage of performances, reactions and the after-party energy.",
  },
  {
    ...serviceLinks[3],
    image: `${R2_BASE}/ring/DSC08445.jpg`,
    alt: "Varmala exchange during an Indian wedding ceremony",
    from: "₹1,25,000",
    text: "Full wedding day documentation from getting ready to vidaai, photo and film.",
  },
];

const addOns = [
  "Cinematic teaser delivered within 72 hours",
  "Same-day edit screened at the reception",
  "Aerial drone coverage (subject to permissions)",
  "Second full film cut for social media",
  "Printed fine-art heirloom album, 40 spreads",
  "Live streaming for family abroad",
  "Additional photographer for a parallel event",
  "Destination travel, stay and logistics handled",
];

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "Most couples book six to twelve months ahead. Peak season dates in November, December and February usually close first.",
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Yes. We've shot across 38 cities in India and abroad. Travel and stay are quoted separately and handled by us.",
  },
  {
    q: "When do we receive our photographs and film?",
    a: "A teaser arrives within a week, edited photographs in four to five weeks, and the full cinematic film in eight to ten weeks.",
  },
  {
    q: "Can packages be combined?",
    a: "Almost every couple does. Combining mehndi, sangeet and wedding day coverage reduces the overall investment considerably.",
  },
];

function Services() {
  return (
    <PageShell floral="marigold" panels={4}>
      <Header />

      <PageHero
        src="/assets/1122.jpeg"
        alt="Service package cover photograph"
        eyebrow="Services & Packages"
        title="Coverage built around your celebration"
      />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Choose A Chapter"
          title="Four services, endlessly combinable"
          intro="Each service page carries its own packages, inclusions and pricing. Combine any of them into a single wedding-week quote."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {cards.map((c, i) => (
            <FadeUp key={c.to} delay={i * 0.08}>
              <Link to={c.to} className="group block h-full">
                <div
                  className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-card/80"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.alt}
                      loading="lazy"
                      className="h-[300px] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <h2 className="font-display text-2xl text-wine">{c.label}</h2>
                    <span className="rule-gold w-16" />
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[0.68rem] uppercase tracking-[0.26em] text-gold-deep">
                        From {c.from}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.26em] text-wine">
                        View <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealImage
            src="/assets/1122.jpeg"
            alt="Service package cover photograph"
            className="aspect-[4/5] w-full"
          />
          <FadeUp className="flex flex-col gap-6">
            <p className="eyebrow">Add-Ons</p>
            <h2 className="text-3xl leading-tight text-wine sm:text-[2.6rem]">
              Extras couples ask us for most
            </h2>
            <span className="rule-gold w-20" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {addOns.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                  <Check size={15} className="mt-0.5 shrink-0 text-gold-deep" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <ButtonLink to="/contact" variant="wine">
                Request A Custom Quote
              </ButtonLink>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-3xl px-5 lg:px-16">
        <SectionHeading eyebrow="Questions" title="Before you enquire" />
        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.06}>
              <div className="rounded-[1.75rem] border border-gold/25 bg-card/70 p-7">
                <h3 className="font-display text-xl text-wine">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
