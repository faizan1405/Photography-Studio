import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { brand, nav, serviceLinks, logo } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-gold/30 bg-cream/80">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-5">
          <img src={logo} alt={brand.name} className="h-40 w-auto self-start lg:h-48" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Cinematic wedding photography and films for couples who want their day
            remembered exactly as it felt.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/clickographersfilms/?hl=en" },
              { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1DTKBBbAgz/?mibextid=wwXIfr" },
              { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@clickographersweddingfilms914" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-gold/40 p-2.5 text-wine transition-colors duration-500 hover:bg-wine hover:text-cream"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="eyebrow">Navigation</h3>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/80 transition-colors hover:text-wine"
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="eyebrow">Services</h3>
          {serviceLinks.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-sm text-foreground/80 transition-colors hover:text-wine"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="eyebrow">Studio</h3>
          <div className="flex items-start gap-3 text-sm text-foreground/80">
            <Phone size={15} className="mt-1 shrink-0 text-gold-deep" />
            <span className="flex flex-col">
              {brand.phones.map((p) => (
                <a key={p} href={`tel:+91${p}`} className="hover:text-wine">
                  {p}
                </a>
              ))}
              <span className="mt-1 text-xs text-muted-foreground">
                WhatsApp: {brand.phones.join(" / ")}
              </span>
            </span>
          </div>
          <a
            href={`mailto:${brand.email}`}
            className="flex items-start gap-3 text-sm text-foreground/80 hover:text-wine"
          >
            <Mail size={15} className="mt-1 shrink-0 text-gold-deep" />
            {brand.email}
          </a>
          <p className="flex items-start gap-3 text-sm text-foreground/80">
            <MapPin size={15} className="mt-1 shrink-0 text-gold-deep" />
            {brand.address}
          </p>
        </div>
      </div>
      <div className="border-t border-gold/25 px-5 py-6 text-center text-xs tracking-[0.16em] text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} {brand.name}. All rights reserved. Designed By{" "}
        <a
          href="https://rankzio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-wine transition-colors hover:text-gold-deep"
        >
          Rank Zio
        </a>
      </div>
    </footer>
  );
}
