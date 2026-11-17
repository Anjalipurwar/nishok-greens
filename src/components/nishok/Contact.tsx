import { useState } from "react";
import { CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_LINK } from "./data";
import { GoldDivider } from "./ui";
import { trackEnquiry } from "./tracking";

const INTERESTS = ["Site Visit", "Brochure", "Plot Enquiry", "General"];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Site Visit",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEnquiry(form);
    const text =
      `Hello Nishok Greens, I'd like to enquire.%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Email: ${form.email}%0A` +
      `Interest: ${form.interest}%0A` +
      `Message: ${form.message}`;
    window.open(`${WHATSAPP_LINK}?text=${text}`, "_blank");
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p
              data-reveal
              className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold"
            >
              Contact
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl"
            >
              Your next chapter
              <br />
              begins here
            </h2>
            <GoldDivider className="mt-7" centered={false} />
            <p
              data-reveal
              className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Share a few details and our team will reach out to arrange your site visit, send the
              brochure, or answer anything you'd like to know. Your enquiry goes straight to us on
              WhatsApp.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground transition-colors hover:text-forest"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/40 text-forest">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    Call / WhatsApp
                  </span>
                  <span className="font-medium">+91 62625 85888</span>
                </span>
              </a>
              <div className="flex items-center gap-4 text-foreground">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/40 text-forest">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    Location
                  </span>
                  <span className="font-medium">Village Garra, Balaghat, MP</span>
                </span>
              </div>
            </div>
          </div>

          <div data-reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-7 shadow-lg sm:p-9"
            >
              {sent ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/50 text-forest">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
                    Thank you
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Your enquiry is on its way to us via WhatsApp. We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-forest"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                        Phone
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 ..."
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      I'm interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setForm({ ...form, interest: it })}
                          className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                            form.interest === it
                              ? "bg-forest text-ivory"
                              : "border border-border text-foreground/70 hover:border-gold/60"
                          }`}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you'd like to know..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-ivory transition-all hover:bg-forest-soft hover:shadow-xl"
                  >
                    Send via WhatsApp
                    <MessageCircle className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    By submitting, you agree to be contacted about Nishok Greens.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
