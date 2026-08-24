import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeUp, RevealImage } from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { img } from "@/lib/site";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Clickographers | Wedding Photographers in Noida" },
      {
        name: "description",
        content:
          "Meet the Clickographers studio — a Noida-based team of wedding photographers and cinematographers documenting Indian weddings across India.",
      },
      { property: "og:title", content: "About Clickographers Wedding Films" },
      {
        property: "og:description",
        content:
          "A small, deliberate studio of wedding photographers and cinematographers based in Noida.",
      },
    ],
  }),
  component: About,
});

import { R2_BASE } from "@/lib/image-urls";

const values = [
  {
    title: "Presence over posing",
    text: "We direct only when it helps. The rest of the day we stay close, quiet and ready — so the photographs look like your wedding, not a shoot.",
  },
  {
    title: "Light first, always",
    text: "Every venue is scouted for how it behaves at each hour. Golden hour portraits, mandap dusk, sangeet stage lighting — planned, never hoped for.",
  },
  {
    title: "Rituals understood",
    text: "We know what happens during a kanyadaan, when the varmala lands, when the vidaai turns. We're in position before the moment arrives.",
  },
  {
    title: "Nothing outsourced",
    text: "The team that meets you is the team that shoots, edits and grades your wedding. One studio, start to finish.",
  },
];

const timeline = [
  { year: "2013", text: "Clickographers begins as two friends photographing a cousin's wedding in Delhi." },
  { year: "2016", text: "The studio moves into wedding films full time, building a dedicated cinematography team." },
  { year: "2019", text: "First destination season — Udaipur, Jaipur, Goa and Rishikesh in a single winter." },
  { year: "2022", text: "Our Noida studio opens at Spectrum Metro, with an in-house grading and album room." },
  { year: "Today", text: "450+ weddings, 38 cities, and a waiting list that starts a year ahead." },
];

function About() {
  return (
    <PageShell floral="green" panels={4}>
      <Header />

      <PageHero
        src={`${R2_BASE}/wedding/DSC05872.jpg`}
        alt="Luxury wedding mandap decorated with flowers at dusk"
        eyebrow="Our Story"
        title="Twelve years of standing quietly in the middle of joy"
        height="h-[88vh]"
      />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeUp className="flex flex-col gap-6">
            <p className="eyebrow">The Studio</p>
            <h2 className="text-4xl leading-[1.08] text-wine sm:text-5xl lg:text-[3.4rem]">
              A studio built around one belief
            </h2>
            <span className="rule-gold w-28" />
            <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
              Clickographers began with a borrowed camera at a family wedding in Delhi. What
              started as favours for cousins became a studio built around one belief: an
              Indian wedding is too full of feeling to be photographed on autopilot.
            </p>
            <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
              Today we're a compact team of photographers, cinematographers and editors
              working out of Noida and travelling anywhere the celebration takes us.
            </p>
            <div className="pt-2">
              <ButtonLink to="/contact" variant="wine">
                Work With Us
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
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <RevealImage
            src={founderImg}
            alt="Founder of Clickographers Wedding Films"
            className="aspect-[3/4] w-full"
          />
          <FadeUp className="flex flex-col gap-6">
            <p className="eyebrow">The Founder</p>
            <h2 className="text-3xl leading-tight text-wine sm:text-[2.7rem]">
              “A wedding photograph should still make you cry in twenty years.”
            </h2>
            <span className="rule-gold w-20" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Our founder shoots every wedding personally as lead photographer. He trained
              as a documentary photographer before weddings, and that instinct still shapes
              the work — watch, wait, and press the shutter when something true happens.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              He also handles the final grade on every film, which is why the studio takes a
              limited number of weddings each season.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading eyebrow="What We Believe" title="Four things we never compromise on" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[2rem] border border-gold/25 bg-card/70 p-8">
                <p className="font-display text-3xl text-gold">0{i + 1}</p>
                <h3 className="font-display text-xl text-wine">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-4xl px-5 lg:px-16">
        <SectionHeading eyebrow="The Journey" title="How the studio grew" />
        <div className="mt-14 flex flex-col">
          {timeline.map((t, i) => (
            <FadeUp key={t.year} delay={i * 0.06}>
              <div className="grid grid-cols-[80px_1fr] gap-6 border-l border-gold/30 pb-10 pl-6 sm:grid-cols-[120px_1fr]">
                <p className="font-display text-2xl text-wine">{t.year}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              src: `${R2_BASE}/pre-wedding/DSC_1399.jpg`,
              alt: "Wedding couple sharing a tender moment during their celebration",
            },
            {
              src: `${R2_BASE}/ring/DSC08445.jpg`,
              alt: "Wedding couple embracing at sunset during their special day",
            },
            {
              src: `${R2_BASE}/pre-wedding/DSC_1499.jpg`,
              alt: "Close-up of wedding rings on the couple's joined hands",
            },
          ].map((p, i) => (
            <RevealImage
              key={i}
              src={p.src}
              alt={p.alt}
              delay={i * 0.06}
              radius="rounded-[1.75rem]"
              className="aspect-[3/4] w-full"
            />
          ))}
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
