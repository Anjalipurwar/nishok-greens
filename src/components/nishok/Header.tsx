import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LOGO_IMG, WHATSAPP_LINK } from "./data";

const NAV = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 text-forest backdrop-blur-xl shadow-[0_4px_24px_rgba(19,42,31,0.08)] border-b border-gold/30"
          : "bg-gradient-to-b from-forest/85 via-forest/40 to-transparent text-ivory"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Ambient luxury halo on hover */}
            <div className="absolute -inset-2 rounded-full bg-gold/25 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Subtle dark backing pill when header is light/white so white emblem never disappears */}
            <div
              className={`flex items-center justify-center rounded-xl p-1.5 transition-all duration-500 ${
                scrolled
                  ? "bg-forest/90 shadow-md ring-1 ring-gold/40 group-hover:bg-forest"
                  : "bg-forest/30 backdrop-blur-sm ring-1 ring-white/10"
              }`}
            >
              <img
                src={LOGO_IMG}
                alt="Nishok Greens Logo"
                className="h-9 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-display text-xl font-semibold uppercase tracking-widest transition-colors duration-300 sm:text-2xl ${
                scrolled
                  ? "text-forest group-hover:text-gold"
                  : "text-ivory drop-shadow-sm group-hover:text-gold"
              }`}
            >
              Nishok Greens
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">
              Breathe · Bloom · Belong
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-forest/85" : "text-ivory/90"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory shadow-md transition-all duration-300 hover:bg-forest-soft hover:shadow-lg hover:scale-105"
          >
            <span className="h-2 w-2 rounded-full bg-[#C9A24B] animate-subtle-pulse" />
            <span>ENQUIRE NOW</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full border p-2.5 transition-colors lg:hidden ${
            scrolled
              ? "border-forest/20 bg-forest/5 text-forest"
              : "border-gold/40 bg-forest/40 text-ivory"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-forest/98 px-5 py-5 backdrop-blur-2xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-ivory/10 py-3 text-sm font-medium text-ivory/85 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-forest"
            >
              Enquire Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
