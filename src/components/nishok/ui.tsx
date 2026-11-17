import { useEffect, useRef } from "react";
import { Flower2 } from "lucide-react";

/**
 * WaterFlow — a real "moving water" overlay for river imagery.
 * Renders layered SVG wave paths that scroll horizontally at
 * different speeds (a seamless river current), plus a traveling
 * light shimmer and a soft sheen. Place it inside a `relative
 * overflow-hidden` container over the image.
 */
export function WaterFlow({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const light = tone === "light";
  const stroke = light ? "rgba(247,243,232,0.55)" : "rgba(198,161,91,0.55)";
  const fill1 = light ? "rgba(247,243,232,0.10)" : "rgba(198,161,91,0.10)";
  const fill2 = light ? "rgba(247,243,232,0.06)" : "rgba(198,161,91,0.06)";
  const fill3 = light ? "rgba(247,243,232,0.04)" : "rgba(198,161,91,0.04)";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer 3 — deepest, slowest */}
      <svg
        className="wave-layer wave-3"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,120 C150,90 300,150 600,120 C900,90 1050,150 1200,120 L1200,200 L0,200 Z"
          fill={fill3}
        />
      </svg>
      {/* Layer 2 — mid */}
      <svg
        className="wave-layer wave-2"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,140 C200,110 400,170 600,140 C800,110 1000,170 1200,140 L1200,200 L0,200 Z"
          fill={fill2}
        />
      </svg>
      {/* Layer 1 — top, fastest, with a visible crest line */}
      <svg
        className="wave-layer wave-1"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,160 C150,130 300,180 600,160 C900,140 1050,180 1200,160 L1200,200 L0,200 Z"
          fill={fill1}
        />
        <path
          d="M0,160 C150,130 300,180 600,160 C900,140 1050,180 1200,160"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {/* Traveling sunlight shimmer */}
      <span className="water-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-ivory/25 to-transparent" />
      {/* Slow broad sheen */}
      <span className="water-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    </div>
  );
}

export function GoldDivider({
  className = "",
  centered = true,
}: {
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        centered ? "mx-auto justify-center" : "justify-start"
      } ${className}`}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold to-gold/60 sm:w-16" />
      <span className="text-gold transition-transform duration-700 hover:rotate-90">
        <Flower2 className="h-4 w-4 animate-subtle-pulse" />
      </span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent via-gold to-gold/60 sm:w-16" />
    </div>
  );
}

export function Pill({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]";
  if (tone === "dark") {
    return (
      <span className={`${base} border border-gold/50 bg-forest/30 text-gold backdrop-blur-sm`}>
        {children}
      </span>
    );
  }
  return <span className={`${base} border border-gold/40 bg-gold/15 text-forest`}>{children}</span>;
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n, i) => {
      n.style.transitionDelay = `${(i % 4) * 90}ms`;
      io.observe(n);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

export const REVEAL_STYLE = `
  [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
  [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
  .hero-zoom { animation: heroZoom 14s ease-out forwards; }
  @keyframes heroZoom { from { transform: scale(1.18); } to { transform: scale(1); } }
  .wa-float { animation: floatPulse 2.6s ease-out infinite; }
  @keyframes floatPulse { 0%,100% { box-shadow: 0 0 0 0 oklch(0.72 0.13 80 / .5);} 50% { box-shadow: 0 0 0 16px oklch(0.72 0.13 80 / 0);} }
`;
