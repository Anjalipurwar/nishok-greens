import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { HERO_IMG, HERO_VIDEO, WHATSAPP_LINK } from "./data";
import { Pill, WaterFlow } from "./ui";

const STATS = [
  { value: "60", label: "Plots Only" },
  { value: "Garra", label: "Village, Balaghat" },
  { value: "Pre-Launch", label: "Now Booking" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Autoplay the background video as soon as it can; retry on failure.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    const tryPlay = () => {
      if (cancelled) return;
      // Browsers only allow muted autoplay — enforce it before play().
      v.muted = true;
      v.play()
        .then(() => !cancelled && setVideoReady(true))
        .catch(() => {
          /* will retry on canplay / click */
        });
    };
    v.addEventListener("canplay", tryPlay, { once: true });
    v.addEventListener("playing", () => !cancelled && setVideoReady(true), {
      once: true,
    });
    tryPlay();
    // Some browsers block autoplay until a user gesture; retry on first interaction.
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
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Cinematic background video */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={HERO_VIDEO}
          poster={HERO_IMG}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Poster fallback while the video buffers */}
        {!videoReady && (
          <img
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover animate-water-2"
          />
        )}
        <span className="pointer-events-none absolute -inset-y-8 left-0 top-0 h-[160%] w-1/3 bg-gradient-to-r from-transparent via-ivory/25 to-transparent animate-water-glint" />
        <WaterFlow tone="light" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/45 to-forest/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/55 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-20 sm:px-8">
        <div className="max-w-3xl">
          <div style={{ opacity: 1, transform: "none" }}>
            <Pill tone="dark">
              <Sparkles className="h-3.5 w-3.5" /> Pre-Launch Showcase
            </Pill>
          </div>

          <h1 className="mt-7 font-display text-[2.7rem] font-medium leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Where Nature Meets
            <br />
            the <span className="italic text-gold">Art of Living</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/90 sm:text-lg">
            A 60-plot lifestyle community rooted beside the Wainganga River at Village Garra,
            Balaghat. Crafted for those who wish to breathe deeper, bloom fuller, and truly belong.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest transition-all hover:bg-gold-soft hover:shadow-xl"
            >
              Book a Site Visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#brochure"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-all hover:border-gold hover:bg-ivory/20 hover:text-gold"
            >
              <Download className="h-4 w-4" /> Download Brochure
            </a>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-ivory/25 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-gold sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/85">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#philosophy"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-ivory/70 transition-colors hover:text-gold"
        aria-label="Scroll down"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ivory/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold" />
        </div>
      </a>
    </section>
  );
}
