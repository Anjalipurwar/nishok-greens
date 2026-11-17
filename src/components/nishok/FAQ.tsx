import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "./data";
import { GoldDivider } from "./ui";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Questions
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            Frequently asked
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                data-reveal
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-gold/60 bg-card shadow-sm" : "border-border bg-card/60"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-medium text-foreground sm:text-xl">
                    {f.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/40 text-forest">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
