import { Quote, Star } from "lucide-react";
import { TESTIMONIALS, WHY_CARDS } from "./data";
import { GoldDivider } from "./ui";

export function Testimonials() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Voices
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            From those who chose to belong
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((q) => (
            <figure
              key={q.name}
              data-reveal
              className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <Quote className="h-9 w-9 text-gold/60" />
              <blockquote className="mt-5 flex-1 font-display text-xl italic leading-relaxed text-foreground">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-7 border-t border-border pt-5">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" stroke="none" />
                  ))}
                </div>
                <div className="mt-2 font-semibold text-foreground">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Why Nishok Greens
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            Five reasons it stands apart
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((c, i) => (
            <div
              key={c.title}
              data-reveal
              className={`group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/40 text-forest transition-all group-hover:bg-forest group-hover:text-ivory">
                  <c.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-medium text-foreground">{c.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
