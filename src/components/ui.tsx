import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "wine";

const styles: Record<Variant, string> = {
  primary:
    "bg-champagne text-wine hover:bg-wine hover:text-cream border border-gold/50",
  secondary:
    "bg-cream text-wine hover:bg-champagne border border-wine/25",
  wine: "bg-wine text-cream hover:bg-gold hover:text-wine border border-wine/40",
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.28em] transition-[background-color,color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      x: ((e.clientX - r.left) / r.width - 0.5) * 10,
      y: ((e.clientY - r.top) / r.height - 0.5) * 7,
    });
  };
  const onLeave = () => setT({ x: 0, y: 0 });
  return { ref, t, onMove, onLeave };
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const { ref, t, onMove, onLeave } = useMagnetic();
  return (
    <Link
      to={to}
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles[variant]} ${className}`}
      style={{ transform: `translate3d(${t.x}px, ${t.y}px, 0)` }}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "wine",
  className = "",
  type = "button",
  href,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  href?: string;
  onClick?: () => void;
}) {
  const { ref, t, onMove, onLeave } = useMagnetic();
  const props = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `${base} ${styles[variant]} ${className}`,
    style: { transform: `translate3d(${t.x}px, ${t.y}px, 0)` },
  };
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-balance text-3xl leading-[1.15] text-wine sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      <span className={`rule-gold w-24 ${align === "center" ? "mx-auto" : ""}`} />
      {intro && (
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}
