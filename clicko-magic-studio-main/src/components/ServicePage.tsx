import { Check } from "lucide-react";
import { RevealImage, FadeUp } from "./Reveal";
import { PageHero } from "./PageHero";
import { ButtonLink, SectionHeading } from "./ui";
import { PageShell } from "./PageShell";
import { Header } from "./Header";
import { Footer } from "./Footer";

export type Pkg = { name: string; price: string; note: string; items: string[]; featured?: boolean };
export type Story = { title: string; text: string; image: string; alt: string };

type Variant = "ivory" | "marigold" | "green" | "blush" | "mixed" | "minimal" | "wine";

export function ServicePage({
  eyebrow,
  title,
  tagline,
  hero,
  heroVideo,
  heroAlt,
  intro,
  stories,
  packages,
  inclusions,
  floral,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  hero: string;
  heroVideo?: string;
  heroAlt: string;
  intro: string;
  stories: Story[];
  packages: Pkg[];
  inclusions: string[];
  floral: Variant;
}) {
  return (
    <PageShell floral={floral} panels={4}>
      <Header />

      <PageHero
        src={hero}
        videoSrc={heroVideo}
        alt={heroAlt}
        eyebrow={eyebrow}
        title={title}
        tagline={tagline}
      />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <FadeUp className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-[1rem] leading-relaxed text-muted-foreground">{intro}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <ButtonLink to="/contact" variant="wine">
              Enquire Now
            </ButtonLink>
            <ButtonLink to="/gallery" variant="secondary">
              See The Gallery
            </ButtonLink>
          </div>
        </FadeUp>
      </section>

      <section className="mx-auto mt-28 flex max-w-[1400px] flex-col gap-24 px-5 lg:px-16">
        {stories.map((s, i) => (
          <div
            key={s.title}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <RevealImage
              src={s.image}
              alt={s.alt}
              dir={i % 2 === 0 ? "left" : "right"}
              className="aspect-[4/5] w-full"
            />
            <FadeUp className="flex flex-col gap-5">
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="text-3xl leading-tight text-wine sm:text-[2.4rem]">{s.title}</h2>
              <span className="rule-gold w-20" />
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </FadeUp>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Every Package Includes"
          title="Considered from the first frame to the final album"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inclusions.map((item, i) => (
            <FadeUp key={item} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-3xl border border-gold/25 bg-card/70 p-6">
                <Check size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                <p className="text-sm leading-relaxed text-foreground/85">{item}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Investment"
          title="Packages & Pricing"
          intro="Transparent starting points. Every celebration is different, so each package can be tailored to your dates, cities and guest count."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col gap-6 rounded-[2rem] border p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${
                  p.featured
                    ? "border-gold bg-wine text-cream"
                    : "border-gold/30 bg-card/80"
                }`}
                style={{ boxShadow: p.featured ? "var(--shadow-editorial)" : "var(--shadow-soft)" }}
              >
                {p.featured && (
                  <span className="self-start rounded-full bg-champagne px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-wine">
                    Most Loved
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <h3
                    className={`text-2xl ${p.featured ? "text-cream" : "text-wine"}`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`text-[0.68rem] uppercase tracking-[0.24em] ${
                      p.featured ? "text-champagne" : "text-gold-deep"
                    }`}
                  >
                    {p.note}
                  </p>
                </div>
                <p
                  className={`font-display text-4xl ${p.featured ? "text-champagne" : "text-wine"}`}
                >
                  {p.price}
                </p>
                <span className={`rule-gold w-full ${p.featured ? "opacity-60" : ""}`} />
                <ul className="flex flex-1 flex-col gap-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${p.featured ? "text-champagne" : "text-gold-deep"}`}
                      />
                      <span className={p.featured ? "text-cream/90" : "text-foreground/85"}>
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  to="/contact"
                  variant={p.featured ? "primary" : "wine"}
                  className="w-full"
                >
                  Check Availability
                </ButtonLink>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-4xl px-5 text-center lg:px-16">
        <FadeUp className="flex flex-col items-center gap-7 rounded-[2.5rem] border border-gold/30 bg-card/70 px-8 py-16">
          <p className="eyebrow">Let's Begin</p>
          <h2 className="text-balance text-3xl leading-tight text-wine sm:text-[2.6rem]">
            Tell us about your wedding and we'll hold your dates
          </h2>
          <span className="rule-gold w-24" />
          <ButtonLink to="/contact" variant="wine">
            Enquire Now
          </ButtonLink>
        </FadeUp>
      </section>

      <Footer />
    </PageShell>
  );
}
