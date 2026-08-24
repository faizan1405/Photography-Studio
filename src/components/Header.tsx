import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { brand, nav, serviceLinks } from "@/lib/site";
import { ButtonLink } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[100] w-full border-b transition-all duration-500 ${
        scrolled
          ? "glass-menu border-gold/30 shadow-[0_18px_50px_-32px_oklch(0.362_0.121_20/0.45)]"
          : "glass-menu border-white/25"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-1.5 lg:px-10">
        <Link to="/" className="shrink-0" aria-label={brand.name} onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt={brand.name} fetchPriority="high" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) =>
            item.label === "Services" ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 text-[0.72rem] uppercase tracking-[0.26em] text-foreground/80 transition-colors hover:text-wine"
                  activeProps={{ className: "text-wine" }}
                >
                  Services <ChevronDown size={13} />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="glass-menu overflow-hidden rounded-2xl border border-white/30 p-2 shadow-[var(--shadow-editorial)]">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="block rounded-xl px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:bg-white/40 hover:text-wine"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-[0.72rem] uppercase tracking-[0.26em] text-foreground/80 transition-colors hover:text-wine"
                activeProps={{ className: "text-wine" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact">Tell Us Your Story</ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-gold/40 p-2.5 text-wine lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="glass-menu border-t border-white/30 px-5 pb-8 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-[0.78rem] uppercase tracking-[0.24em] text-foreground/85"
                activeProps={{ className: "text-wine" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <span className="rule-gold my-2 w-full" />
            {serviceLinks.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {s.label}
              </Link>
            ))}
            <div className="mt-5">
              <ButtonLink to="/contact" className="w-full">
                Tell Us Your Story
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
