import { useState } from "react";
import { Download, ExternalLink, Play, X } from "lucide-react";
import {
  BROCHURE_IMG,
  BROCHURE_LINK,
  GALLERY,
  WALKTHROUGH_VIDEO,
  WALKTHROUGH_POSTER,
  AERIAL_VIEW_VIDEO,
  AERIAL_VIEW_POSTER,
} from "./data";
import { GoldDivider, WaterFlow } from "./ui";

const SHOTS = [
  { src: GALLERY.river, label: "The Wainganga", flow: "animate-water-1", delay: "0s", water: true },
  {
    src: GALLERY.pool,
    label: "Clubhouse & Pool",
    flow: "animate-water-2",
    delay: "1.6s",
    water: true,
  },
  { src: GALLERY.yoga, label: "Yoga Deck", flow: "animate-water-3", delay: "0.8s", water: false },
  {
    src: GALLERY.temple,
    label: "The Temple",
    flow: "animate-water-4",
    delay: "2.4s",
    water: false,
  },
];

function Glint({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="pointer-events-none absolute -inset-y-8 left-0 top-0 h-[170%] w-1/3 bg-gradient-to-r from-transparent via-ivory/20 to-transparent animate-water-glint"
      style={{ animationDelay: delay }}
    />
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Gallery
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            A glimpse of what awaits
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SHOTS.map((s, i) => {
            const isWainganga = s.label === "The Wainganga";

            if (isWainganga) {
              return (
                <figure
                  key={s.label}
                  data-reveal
                  className="group relative overflow-hidden rounded-3xl shadow-md sm:row-span-2 min-h-[380px] sm:min-h-[520px] bg-forest"
                >
                  <video
                    src="https://n.uguu.se/FucaNgZoRvJg.mp4"
                    poster={s.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  />
                  <Glint delay={s.delay} />
                  <WaterFlow tone="light" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent pointer-events-none" />

                  {/* Top-right Live Video badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-forest/85 px-3 py-1 text-[11px] font-medium text-gold backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-subtle-pulse" />
                    Live Drone Video
                  </div>

                  <figcaption className="absolute bottom-5 left-5 z-10 flex items-center gap-2 text-ivory">
                    <span className="h-px w-6 bg-gold" />
                    <span className="font-display text-xl">{s.label}</span>
                  </figcaption>
                </figure>
              );
            }

            return (
              <figure
                key={s.label}
                data-reveal
                className="group relative overflow-hidden rounded-3xl shadow-sm"
              >
                <img
                  src={s.src}
                  alt={s.label}
                  loading="lazy"
                  className={`${s.flow} w-full object-cover h-72`}
                />
                <Glint delay={s.delay} />
                {s.water && <WaterFlow tone="light" />}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/10 to-transparent" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 text-ivory">
                  <span className="h-px w-6 bg-gold" />
                  <span className="font-display text-xl">{s.label}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Brochure() {
  return (
    <section id="brochure" className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            The Brochure
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            Hold the vision in your hands
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure
            data-reveal
            className="group relative overflow-hidden rounded-3xl border border-gold/40 bg-forest/20 p-3 shadow-2xl transition-all duration-500 hover:border-gold/70 sm:p-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-forest/80 shadow-inner">
              <img
                src={BROCHURE_IMG}
                alt="Nishok Greens riverside community master plan"
                loading="lazy"
                className="animate-water-3 h-full w-full object-cover"
              />
              <Glint delay="1s" />
              <WaterFlow tone="light" />
              {/* Always-on luminous river sunlight shimmer */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent animate-shimmer"
                style={{ backgroundSize: "200% 100%" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    Master Plan & River View
                  </p>
                  <p className="font-display text-lg text-ivory">Village Garra, Balaghat</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-forest/80 px-3 py-1 text-[11px] font-medium text-gold backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-subtle-pulse" />
                  Wainganga Frontage
                </span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between px-2 text-xs font-medium text-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-subtle-pulse" />
                <span className="font-semibold text-foreground">
                  Official Project Showcase & Brochure
                </span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                60 Plots Only
              </span>
            </figcaption>
          </figure>

          <div data-reveal className="relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-forest-soft/40 blur-3xl" />
            <div className="relative rounded-[2rem] border border-gold/40 bg-forest px-7 py-10 text-ivory shadow-xl sm:px-12 sm:py-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                Full project document
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
                Master plan, layouts & pricing
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/85 sm:text-base">
                Plot layouts, amenities, specifications and pricing — all in one beautifully
                designed document. Preview it now or share your details and we'll send the full
                brochure straight to your inbox.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={BROCHURE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-forest transition-all hover:bg-gold-soft hover:shadow-xl"
                >
                  <ExternalLink className="h-4 w-4" /> View Brochure
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-6 py-3.5 text-sm font-semibold text-ivory transition-all hover:border-gold hover:bg-ivory/20 hover:text-gold"
                >
                  <Download className="h-4 w-4" /> Request a Copy
                </a>
              </div>
              <p className="mt-6 text-xs text-ivory/70">
                Or message us directly on WhatsApp for the complete document.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Walkthrough() {
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    desc: string;
    src: string;
  } | null>(null);

  const videos = [
    {
      title: "Site Walkthrough",
      desc: "A guided tour of the community grounds",
      img: WALKTHROUGH_POSTER || GALLERY.valley,
      flow: "animate-water-1",
      delay: "0s",
      water: false,
      src: WALKTHROUGH_VIDEO,
    },
    {
      title: "Aerial View · The Wainganga",
      desc: "The river, the forest, and master layout from above",
      img: AERIAL_VIEW_POSTER || GALLERY.river,
      flow: "animate-water-2",
      delay: "2s",
      water: true,
      src: AERIAL_VIEW_VIDEO,
    },
  ];

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
          >
            Walkthrough
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl"
          >
            See it in motion
          </h2>
          <GoldDivider className="mt-7" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {videos.map((v) => (
            <div
              key={v.title}
              data-reveal
              className="group relative aspect-video overflow-hidden rounded-3xl border border-gold/40 bg-forest shadow-lg transition-all duration-300 hover:border-gold hover:shadow-2xl"
            >
              {/* Actual Video playing in background with subtle loop & muted preview */}
              <video
                src={v.src}
                poster={v.img}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
              <Glint delay={v.delay} />
              {v.water && <WaterFlow tone="light" />}

              {/* Overlay with title & interactive expand button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-forest/85 via-forest/20 to-transparent p-6 text-center">
                {/* Live video indicator */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-forest/85 px-3 py-1 text-[11px] font-medium text-gold backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-subtle-pulse" />
                  Drone Video
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideo({ title: v.title, desc: v.desc, src: v.src })}
                  className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gold text-forest shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-gold-soft cursor-pointer"
                  aria-label={`Open full player for ${v.title}`}
                >
                  <Play className="h-7 w-7 sm:h-8 sm:w-8 translate-x-0.5" fill="currentColor" />
                </button>
                <h3 className="mt-4 font-display text-xl sm:text-2xl text-ivory drop-shadow-md">
                  {v.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ivory/85 drop-shadow">{v.desc}</p>
                <button
                  type="button"
                  onClick={() => setActiveVideo({ title: v.title, desc: v.desc, src: v.src })}
                  className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-gold underline underline-offset-4 hover:text-gold-soft"
                >
                  Watch with Audio
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Live drone footage playing above. Click any card or play button to watch in
          high-definition with sound.
        </p>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-gold/40 bg-forest shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-4">
              <div>
                <h3 className="font-display text-xl text-ivory">{activeVideo.title}</h3>
                <p className="text-xs text-gold">{activeVideo.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-full border border-ivory/20 bg-ivory/10 p-2 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-forest"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video src={activeVideo.src} controls autoPlay className="h-full w-full object-cover">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
