import { MapPin, MessageCircle, Phone } from "lucide-react";
import { AMENITIES, LOGO_IMG, WHATSAPP_LINK } from "./data";

export function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={LOGO_IMG} alt="Nishok Greens Logo" className="h-10 w-auto object-contain" />
              <div>
                <div className="font-display text-2xl font-semibold uppercase tracking-wider">
                  Nishok Greens
                </div>
                <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.32em] text-gold">
                  Breathe · Bloom · Belong
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/80">
              A 60-plot lifestyle community beside the Wainganga River at Village Garra, Balaghat.
              Promoted & developed by CZRD Ventures, design and architecture by KDBY Associates,
              Mumbai.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Amenities
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {AMENITIES.map((a) => (
                <li key={a.label} className="flex items-center gap-2 text-sm text-ivory/85">
                  <a.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {a.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Connect
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/85">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> +91 62625 85888
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> Village Garra, Balaghat, MP
              </li>
              <li>
                <a
                  href="https://instagram.com/nishokgreens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <svg
                    className="h-4 w-4 text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@nishokgreens</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-forest transition-colors hover:bg-gold-soft"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-ivory/70 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Nishok Greens by CZRD Ventures. All rights reserved.</p>
          <p>RERA P-BGT-XX-XXXX · Registration in final process</p>
        </div>
      </div>
    </footer>
  );
}
