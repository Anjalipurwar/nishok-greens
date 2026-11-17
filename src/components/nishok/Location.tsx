import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, Play, Volume2, VolumeX } from "lucide-react";
import { GALLERY, WAINGANGA_VIDEO } from "./data";
import { GoldDivider, WaterFlow } from "./ui";

const HIGHLIGHTS = [
  "Balaghat–Jabalpur Highway frontage",
  "Beside the Wainganga River",
  "Village Garra, Balaghat, Madhya Pradesh",
  "Accessible, yet wrapped in green",
];

export function Location() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;

    const playVideo = () => {
      if (cancelled) return;
      v.muted = true;
      v.play()
        .then(() => {
          if (!cancelled) setIsPlaying(true);
        })
        .catch(() => {
          /* autoplay blocked or pending interaction */
        });
    };

    v.addEventListener("canplay", playVideo, { once: true });
    v.addEventListener("playing", () => {
      if (!cancelled) setIsPlaying(true);
    });

    playVideo();

    const onUserInteraction = () => {
      playVideo();
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };
    window.addEventListener("click", onUserInteraction, { once: true });
    window.addEventListener("touchstart", onUserInteraction, { once: true });

    return () => {
      cancelled = true;
      v.removeEventListener("canplay", playVideo);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const manualPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  return (
    <section id="location" className="relative overflow-hidden bg-forest py-24 text-ivory sm:py-32">
      {/* Background ambient gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, var(--color-gold) 0, transparent 45%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Location & Riverfront
          </p>
          <h2 data-reveal className="mt-4 font-display text-4xl font-medium sm:text-5xl">
            Rooted in Balaghat, Blessed by the Wainganga
          </h2>
          <GoldDivider className="mt-7" />
          <p
            data-reveal
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base"
          >
            Village Garra, along the Balaghat–Jabalpur Highway. Experience the actual aerial view of
            the Wainganga River wrapping around our 60-plot lifestyle community.
          </p>
        </div>

        {/* Feature River Video Player Showcase */}
        <div
          data-reveal
          className="mt-14 overflow-hidden rounded-3xl border border-gold/40 bg-forest-soft/60 p-3 shadow-2xl sm:p-5"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black shadow-inner sm:aspect-[21/9]">
            <video
              ref={videoRef}
              src={WAINGANGA_VIDEO}
              poster={GALLERY.river}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />

            {/* Moving water flow overlay + subtle sunlight glint */}
            <WaterFlow tone="light" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/30" />

            {/* Video overlay badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest/80 px-3.5 py-1.5 text-xs font-medium text-gold backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold animate-subtle-pulse" />
                Live Drone Footage · The Wainganga River
              </span>
            </div>

            {/* Sound toggle & playback controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 bg-forest/80 text-ivory backdrop-blur-md transition-colors hover:border-gold hover:text-gold"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Floating title bar at the bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4 text-ivory">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                  Actual Riverfront View (30s Aerial Clip)
                </p>
                <p className="font-display text-xl text-ivory sm:text-2xl">
                  Village Garra, Balaghat–Jabalpur Highway
                </p>
              </div>

              {!isPlaying && (
                <button
                  type="button"
                  onClick={manualPlay}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold text-forest shadow-lg hover:bg-gold-soft"
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Play Video
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content grid: Info & Map */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              Connectivity
            </p>
            <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              Connected to the region, quietly apart
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/85 sm:text-base">
              Where the highway hum gently fades and the serene rhythm of the Wainganga River takes
              over. Minutes from town, yet untouched by urban clutter.
            </p>

            <ul className="mt-6 space-y-3.5">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-ivory/90">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest transition-all hover:bg-gold-soft hover:shadow-xl"
              >
                Schedule a Site Visit <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://maps.google.com/?q=Garra,+Balaghat,+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-6 py-3.5 text-sm font-semibold text-ivory transition-all hover:border-gold hover:text-gold"
              >
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="relative min-h-[360px] overflow-hidden rounded-3xl border border-ivory/20 bg-ivory/5 p-2 shadow-xl"
          >
            <iframe
              title="Nishok Greens location — Village Garra, Balaghat"
              src="https://www.google.com/maps?q=Balaghat-Jabalpur%20Highway%2C%20Garra%2C%20Balaghat%2C%20Madhya%20Pradesh&output=embed"
              className="h-full min-h-[360px] w-full rounded-2xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
