import { brand } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}?text=Hi%20Clickographers%2C%20I%27d%20love%20to%20know%20more%20about%20your%20wedding%20photography.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Clickographers on WhatsApp"
      className="group fixed bottom-6 right-5 z-[65] flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      <span className="hidden rounded-full border border-gold/40 bg-ivory/95 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-wine opacity-0 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-cream transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        style={{
          background: "linear-gradient(140deg, oklch(0.72 0.17 148), oklch(0.55 0.15 150))",
          boxShadow: "0 16px 34px -14px oklch(0.55 0.15 150 / 0.75)",
          animation: "wa-float 3.4s ease-in-out infinite",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-cream/50"
          style={{ animation: "wa-pulse 2.6s ease-out infinite" }}
        />
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.15-.15.32-.37.47-.55.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.2 5.07 4.37 2.98 1.17 2.98.78 3.52.73.54-.05 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.93L2 22l5.37-1.4a9.82 9.82 0 0 0 4.67 1.19c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2Zm0 17.87c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.16.83.84-3.08-.2-.32a8.02 8.02 0 0 1-1.23-4.28c0-4.43 3.6-8.03 8.04-8.03 4.43 0 8.03 3.6 8.03 8.03 0 4.44-3.6 8.19-7.77 8.19Z" />
        </svg>
      </span>
      <style>{`
        @keyframes wa-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes wa-float { 0%, 100% { transform: none; } }
          @keyframes wa-pulse { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </a>
  );
}
