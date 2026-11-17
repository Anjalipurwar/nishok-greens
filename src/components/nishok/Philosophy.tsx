import { useEffect, useRef, useState } from "react";
import { PHILOSOPHY_CARDS, DETAIL_ITEMS, DETAILS_VIDEO } from "./data";
import { GoldDivider } from "./ui";

export function Philosophy() {
  return (
    <section id="philosophy" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Our Philosophy
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            Three promises, one way of life
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PHILOSOPHY_CARDS.map((c, i) => (
            <div
              key={c.word}
              data-reveal
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-9 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-2xl"
            >
              {/* Subtle animated floating badge with soft glowing aura */}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/5 text-forest transition-all duration-500 group-hover:scale-110 group-hover:bg-forest group-hover:text-ivory group-hover:shadow-lg">
                <div className="absolute inset-0 rounded-full border border-gold/30 opacity-60 animate-subtle-pulse" />
                <c.icon
                  className={`h-7 w-7 transition-transform duration-500 group-hover:rotate-6 ${
                    i === 0 ? "animate-gentle-float" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-6 font-display text-3xl font-medium text-foreground transition-colors duration-300 group-hover:text-forest">
                {c.word}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              <span className="pointer-events-none absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 group-hover:w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Details() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    const tryPlay = () => {
      if (cancelled) return;
      v.muted = true;
      v.play()
        .then(() => !cancelled && setVideoReady(true))
        .catch(() => {
          /* will retry on canplay / interaction */
        });
    };
    v.addEventListener("canplay", tryPlay, { once: true });
    v.addEventListener("playing", () => !cancelled && setVideoReady(true), {
      once: true,
    });
    tryPlay();
    const onGesture = () => {
      tryPlay();
      window.removeEventListener("click", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
    window.addEventListener("click", onGesture, { once: true });
    window.addEventListener("touchstart", onGesture, { once: true });
    return () => {
      cancelled = true;
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("playing", tryPlay);
      window.removeEventListener("click", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);

  return (
    <section id="details" className="relative overflow-hidden bg-forest py-24 text-ivory sm:py-32">
      {/* Cinematic background video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoReady ? "opacity-25" : "opacity-0"
        }`}
        src={DETAILS_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/80 to-forest/90" />
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, var(--color-gold) 0, transparent 40%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            The Details
          </p>
          <h2 data-reveal className="mt-4 font-display text-4xl font-medium sm:text-5xl">
            Everything worth knowing
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DETAIL_ITEMS.map((it) => {
            const isGoldCard = it.title === "+91 62625 85888";
            const Comp = it.href ? "a" : "div";
            const linkProps = it.href
              ? {
                  href: it.href,
                  target: it.external ? "_blank" : undefined,
                  rel: it.external ? "noopener noreferrer" : undefined,
                }
              : {};

            return (
              <Comp
                key={it.title}
                data-reveal
                {...linkProps}
                className={`group flex flex-col justify-between rounded-3xl p-8 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
                  isGoldCard
                    ? "border-2 border-gold bg-forest-soft/70 hover:border-gold hover:bg-forest-soft/90"
                    : "border border-ivory/15 bg-forest-soft/40 hover:border-gold/60 hover:bg-forest-soft/70"
                }`}
              >
                <div>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                      isGoldCard
                        ? "bg-gold text-forest shadow-lg group-hover:scale-110 group-hover:bg-gold-soft"
                        : "border border-gold/40 bg-gold/10 text-gold group-hover:scale-105 group-hover:border-gold group-hover:bg-gold group-hover:text-forest"
                    }`}
                  >
                    <it.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-normal text-ivory tracking-wide group-hover:text-gold transition-colors">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">{it.text}</p>
                </div>
              </Comp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
