import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/nishok/Header";
import { Hero } from "@/components/nishok/Hero";
import { Philosophy, Details } from "@/components/nishok/Philosophy";
import { Gallery, Brochure, Walkthrough } from "@/components/nishok/Gallery";
import { Testimonials, Why } from "@/components/nishok/Testimonials";
import { Location } from "@/components/nishok/Location";
import { FAQ } from "@/components/nishok/FAQ";
import { Contact } from "@/components/nishok/Contact";
import { Footer } from "@/components/nishok/Footer";
import { REVEAL_STYLE, useReveal } from "@/components/nishok/ui";
import { HERO_IMG } from "@/components/nishok/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nishok Greens — Breathe · Bloom · Belong | Pre-Launch Showcase",
      },
      {
        name: "description",
        content:
          "Nishok Greens: a 60-plot lifestyle community at Village Garra, Balaghat-Jabalpur Highway, beside the Wainganga River. Pre-launch showcase — enquiries, brochure & site visits.",
      },
      {
        property: "og:title",
        content: "Nishok Greens — Breathe · Bloom · Belong",
      },
      {
        property: "og:description",
        content:
          "A 60-plot lifestyle community beside the Wainganga River, Balaghat. Where nature meets the art of living. Pre-launch showcase now open.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:image", content: HERO_IMG },
    ],
  }),
  component: Index,
});

function Index() {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <style>{REVEAL_STYLE}</style>
      <Header />
      <Hero />
      <Philosophy />
      <Details />
      <Gallery />
      <Brochure />
      <Walkthrough />
      <Testimonials />
      <Why />
      <Location />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
