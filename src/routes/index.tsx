import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Film, Heart, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeUp, RevealImage } from "@/components/Reveal";
import { OptimizedImage } from "@/components/OptimizedImage";
import { ButtonLink, SectionHeading, ActionButton } from "@/components/ui";
import { brand, img, serviceLinks, video } from "@/lib/site";
import { R2_BASE } from "@/lib/image-urls";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clickographers Wedding Films | Indian Wedding Photography, Noida" },
      {
        name: "description",
        content:
          "Cinematic Indian wedding photography and wedding films by Clickographers, Noida. Pre wedding shoots, sangeet, mehndi and wedding day storytelling.",
      },
      { property: "og:title", content: "Clickographers Wedding Films | Indian Wedding Photography" },
      {
        property: "og:description",
        content:
          "Wedding photography and films made like heirlooms — pheras, varmala, sangeet, mehndi and pre wedding stories.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    label: "Pre Wedding",
    to: "/pre-wedding",
    image: `${R2_BASE}/pre-wedding/DSC_0644.jpg`,
    alt: "Indian couple in a palace courtyard during a pre wedding shoot",
    text: "Unhurried portrait films in palaces, fields and quiet corners of the city.",
  },
  {
    label: "Sangeet",
    to: "/sangeet",
    image: `${R2_BASE}/ring/IMG_9813.jpg`,
    alt: "Bride and groom dancing at their sangeet",
    text: "Stage lights, family choreography and the loudest laughter of the week.",
  },
  {
    label: "Mehndi",
    to: "/mehndi-photoshoots",
    image: `${R2_BASE}/assets/haldi-mehendi/DSC01283.webp`,
    alt: "Bride's hands being decorated with mehndi",
    text: "Green, gold and detail — the slow, tactile morning before the storm.",
  },
  {
    label: "Wedding Photography",
    to: "/wedding-photography",
    image: `${R2_BASE}/ring/DSC08445.jpg`,
    alt: "Varmala exchange between bride and groom",
    text: "Varmala to Vidai, capturing the emotions, celebrations and fleeting moments that make your wedding yours.",
  },
] as const;

const stats = [
  { value: "450+", label: "Weddings Filmed" },
  { value: "12", label: "Years Behind The Lens" },
  { value: "38", label: "Cities Travelled" },
  { value: "100%", label: "Couples Who'd Book Again" },
];

const testimonials = [
  {
    quote:
      "They disappeared into our wedding and came back with the version of the day we actually felt. My mother cried watching the film — twice.",
    name: "Aditi & Rohan",
    place: "Jaipur",
  },
  {
    quote:
      "Every frame looks like a painting but nothing was posed. The pheras coverage is something our family will keep forever.",
    name: "Sneha & Karan",
    place: "Delhi",
  },
  {
    quote:
      "From the mehndi to the vidaai they were three steps ahead of us. Calm, warm, and unbelievably good with light.",
    name: "Priya & Aman",
    place: "Udaipur",
  },
];

const process = [
  { icon: Heart, title: "We Meet", text: "A long conversation about your families, your rituals and how you want to remember it all." },
  { icon: Camera, title: "We Plan", text: "Timelines, light, venues and a shot approach built around your celebration, not a template." },
  { icon: Film, title: "We Film", text: "Two lead photographers and a cinematography team, present but never in the frame." },
  { icon: Sparkles, title: "We Deliver", text: "Hand-graded photographs, a cinematic film and a printed heirloom album." },
];

function Home() {
  return (
    <PageShell floral="mixed" panels={5}>
      <Header />

      <PageHero
        src={`${R2_BASE}/pre-wedding/DSC_1145.jpg`}
        videoSrc={video.heroSection}
        alt="Indian bride and groom taking their pheras around the sacred fire"
        eyebrow="Indian Wedding Photography & Films"
        title="Your wedding, remembered the way it felt"
        height="h-[92vh]"
      >
        <ButtonLink to="/contact">Tell Us Your Story</ButtonLink>
        <ButtonLink to="/contact" variant="wine">
          Enquire Now
        </ButtonLink>
      </PageHero>

      <section className="mx-auto mt-28 max-w-[1400px] px-5 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <FadeUp className="flex flex-col gap-6">
            <p className="eyebrow">The Studio</p>
            <h2 className="text-balance text-3xl leading-[1.14] text-wine sm:text-4xl lg:text-[3rem]">
              We photograph Indian weddings like heirlooms, not content
            </h2>
            <span className="rule-gold w-24" />
            <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
              Clickographers is a small, deliberate studio based in Noida. We work with
              couples who care about craft — about how the light falls on a mandap at
              dusk, how a grandmother's hands look during the kanyadaan, how a film can
              hold an entire week of celebration in eight minutes.
            </p>
            <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
              Every wedding is covered by two lead photographers and a dedicated
              cinematography team. Nothing is outsourced, nothing is templated, and every
              frame is hand-graded by us.
            </p>
            <div className="pt-2">
              <ButtonLink to="/about" variant="secondary">
                Our Story <ArrowRight size={14} />
              </ButtonLink>
            </div>
          </FadeUp>
          <RevealImage
            src={`${R2_BASE}/studio/studio-img.jpg`}
            alt="Clickographers studio at Spectrum Metro Mall, Noida"
            dir="right"
            className="aspect-[4/5] w-full"
          />
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="What We Photograph"
          title="Four chapters of one celebration"
          intro="Each ritual has its own light, pace and emotion. We shoot each one differently."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <FadeUp key={s.to} delay={i * 0.08}>
              <Link to={s.to} className="group block">
                <div className="relative overflow-hidden rounded-[2rem]" style={{ boxShadow: "var(--shadow-soft)" }}>
                  <OptimizedImage
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    imgClassName="h-[380px] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, oklch(0.28 0.10 22 / 0.72) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
                    <h3 className="font-display text-2xl text-cream sm:text-[1.8rem]">{s.label}</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-cream/85">{s.text}</p>
                    <span className="mt-2 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-champagne">
                      Explore <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <div className="grid gap-8 rounded-[2.5rem] border border-gold/25 bg-card/70 px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-4xl text-wine sm:text-5xl">{s.value}</p>
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.28em] text-gold-deep">
                {s.label}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading eyebrow="Selected Frames" title="From recent weddings" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: `${R2_BASE}/ring/DSC02844.jpg`, alt: "Wedding ceremony moment", tall: true },
            { src: `${R2_BASE}/pre-wedding/DSC_0746.jpg`, alt: "Pre-wedding portrait in natural light" },
            { src: `${R2_BASE}/assets/haldi-mehendi/IMG_7303.webp`, alt: "Mehndi detail with floral jewellery" },
            { src: `${R2_BASE}/pre-wedding/DSC_0791.jpg`, alt: "Couple on stone steps at sunset", tall: true },
            { src: `${R2_BASE}/assets/haldi-mehendi/DSC01283.webp`, alt: "Mehndi ceremony with family" },
          ].map((p, i) => (
            <RevealImage
              key={i}
              src={p.src}
              alt={p.alt}
              delay={i * 0.05}
              dir={i % 2 === 0 ? "up" : "down"}
              radius="rounded-[1.75rem]"
              className={p.tall ? "aspect-[3/4] w-full" : "aspect-[4/5] w-full"}
            />
          ))}
        </div>
        <FadeUp className="mt-12 flex justify-center">
          <ButtonLink to="/gallery">Open Full Gallery</ButtonLink>
        </FadeUp>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading eyebrow="How We Work" title="Four steps, no surprises" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-gold/25 bg-card/70 p-7">
                <p.icon size={22} className="text-gold-deep" />
                <h3 className="font-display text-xl text-wine">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading eyebrow="Kind Words" title="What couples tell us afterwards" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.08}>
              <blockquote className="flex h-full flex-col gap-6 rounded-[2rem] border border-gold/25 bg-card/70 p-8">
                <span className="font-display text-5xl leading-none text-gold">“</span>
                <p className="flex-1 text-[0.95rem] italic leading-relaxed text-foreground/85">
                  {t.quote}
                </p>
                <footer className="flex flex-col gap-1">
                  <span className="rule-gold w-14" />
                  <p className="mt-3 text-sm text-wine">{t.name}</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold-deep">
                    {t.place}
                  </p>
                </footer>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <OptimizedImage
            src={`${R2_BASE}/ring/DSC08691.jpg`}
            alt="Luxury wedding mandap decorated with flowers at dusk"
            loading="lazy"
            className="h-[520px] w-full object-cover"
          />
          <span
            className="absolute inset-0"
            style={{ background: "oklch(0.28 0.10 22 / 0.58)" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-champagne">
              {brand.address.split(",").slice(-1)[0]?.trim()}
            </p>
            <h2 className="max-w-2xl text-balance font-display text-3xl leading-tight text-cream sm:text-[3rem]">
              Dates fill quickly through the season
            </h2>
            <span className="rule-gold w-24" />
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink to="/contact">Enquire Now</ButtonLink>
              <ButtonLink to="/services" variant="wine">
                See Packages
              </ButtonLink>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs tracking-[0.2em] text-cream/80">
              {serviceLinks.map((s) => (
                <Link key={s.to} to={s.to} className="hover:text-champagne">
                  {s.label.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
