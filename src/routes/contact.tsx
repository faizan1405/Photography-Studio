import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeUp, RevealImage } from "@/components/Reveal";
import { ActionButton, SectionHeading } from "@/components/ui";
import { brand, img, serviceLinks } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Clickographers Wedding Films | Noida" },
      {
        name: "description",
        content:
          "Enquire about wedding photography and films. Call 9716284428 or 8076561746, email clickographersart@gmail.com, or visit our Noida studio.",
      },
      { property: "og:title", content: "Contact Clickographers Wedding Films" },
      {
        property: "og:description",
        content: "Tell us about your wedding dates and we'll check availability.",
      },
    ],
  }),
  component: Contact,
});

const inputClass =
  "w-full rounded-2xl border border-gold/30 bg-card/80 px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-500 placeholder:text-muted-foreground/70 focus:border-wine focus:ring-2 focus:ring-gold/30";

function Contact() {
  return (
    <PageShell floral="blush" panels={4}>
      <Header />

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <SectionHeading
          eyebrow="Enquiries"
          title="We reply within 24 hours"
          intro="Share your dates, cities and the functions you'd like covered. We reply to every enquiry within 24 hours."
        />
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <FadeUp>
            <form
              className="flex flex-col gap-5 rounded-[2.25rem] border border-gold/25 bg-card/70 p-8 sm:p-10"
              style={{ boxShadow: "var(--shadow-soft)" }}
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const get = (k: string) => String(f.get(k) ?? "").trim();
                const message = [
                  "New wedding enquiry",
                  `Name: ${get("name")}`,
                  `Phone: ${get("phone")}`,
                  `Email: ${get("email")}`,
                  `Wedding Dates: ${get("dates") || "-"}`,
                  `City / Venue: ${get("city") || "-"}`,
                  `Service: ${get("service") || "-"}`,
                  `Details: ${get("message") || "-"}`,
                ].join("\n");
                window.open(
                  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Your Name</span>
                  <input required name="name" className={inputClass} placeholder="Aditi & Rohan" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Phone</span>
                  <input required name="phone" type="tel" className={inputClass} placeholder="98xxxxxxxx" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="eyebrow">Email</span>
                <input required name="email" type="email" className={inputClass} placeholder="you@email.com" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Wedding Dates</span>
                  <input name="dates" className={inputClass} placeholder="12–15 February 2027" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">City / Venue</span>
                  <input name="city" className={inputClass} placeholder="Udaipur" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="eyebrow">Service Of Interest</span>
                <select name="service" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceLinks.map((s) => (
                    <option key={s.to} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                  <option value="Full Wedding Week">Full Wedding Week</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow">Tell Us More</span>
                <textarea
                  name="message"
                  rows={5}
                  className={inputClass}
                  placeholder="Functions you'd like covered, guest count, anything we should know…"
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ActionButton type="submit" variant="wine">
                  Send Enquiry
                </ActionButton>
              </div>
            </form>
          </FadeUp>

          <div className="flex flex-col gap-6">
            <FadeUp>
              <div className="flex flex-col gap-6 rounded-[2.25rem] border border-gold/25 bg-card/70 p-8">
                <h2 className="font-display text-2xl text-wine">Studio Details</h2>
                <span className="rule-gold w-16" />
                <div className="flex items-start gap-4 text-sm text-foreground/85">
                  <Phone size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                  <span className="flex flex-col gap-1">
                    {brand.phones.map((p) => (
                      <a key={p} href={`tel:+91${p}`} className="hover:text-wine">
                        +91 {p}
                      </a>
                    ))}
                  </span>
                </div>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-start gap-4 text-sm text-foreground/85 hover:text-wine"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                  {brand.email}
                </a>
                <p className="flex items-start gap-4 text-sm text-foreground/85">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                  {brand.address}
                </p>
                <p className="flex items-start gap-4 text-sm text-foreground/85">
                  <Clock size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                  Studio visits by appointment, 11am – 8pm daily
                </p>
              </div>
            </FadeUp>
            <RevealImage
              src=""
              alt="Bride and groom exchanging varmala garlands"
              dir="right"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-5 lg:px-16">
        <FadeUp>
          <div className="overflow-hidden rounded-[2.25rem] border border-gold/25">
            <iframe
              title="Clickographers studio location map"
              src="https://www.google.com/maps?q=Spectrum%20Metro%20Mall%20Noida%20Sector%2075&output=embed"
              loading="lazy"
              className="h-[420px] w-full"
            />
          </div>
        </FadeUp>
      </section>

      <Footer />
    </PageShell>
  );
}
