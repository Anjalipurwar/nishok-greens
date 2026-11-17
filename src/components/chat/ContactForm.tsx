import { useState } from "react";
import { PhoneField, type ContactField } from "./PhoneField";
import { CHAT_COPY as C } from "@/lib/chat-widget-copy";

export function ContactForm({
  fields,
  chat,
  state,
}: {
  fields: ContactField[];
  chat: any;
  state: any;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [consent, setConsent] = useState<boolean>(
    state.config?.compliance?.defaultConsentCheck ?? false,
  );
  const submitting = state.requestState === "in_progress";
  const compliance = state.config?.compliance ?? {};
  const captcha = state.captchaRequired;

  const onChange = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = fields.filter((f) => f.required).map((f) => f.value);
    const miss = req.filter((k) => !values[k]?.trim());
    if (miss.length) {
      setMissing(miss);
      return;
    }
    if (compliance.consentRequired && !consent) return;
    setMissing([]);
    const payload = Object.fromEntries(fields.map((f) => [f.value, values[f.value] ?? ""]));
    await chat.submitContactForm({ ...payload, consentGiven: consent });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 border-t border-ivory/10 p-4">
      {fields.map((f) => {
        const isPhone = f.dataType === "PHONE";
        const isEmail = f.dataType === "EMAIL";
        const isArea = f.dataType === "TEXTAREA";
        const invalid = state.error?.field === f.value ? state.error?.message : undefined;
        const isMissing = missing.includes(f.value);
        return (
          <div key={f.value}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ivory/70">
              {f.label}
              {f.required && <span className="ml-0.5 text-gold">*</span>}
            </label>
            {isPhone ? (
              <PhoneField
                field={f}
                value={values[f.value] ?? ""}
                onChange={onChange}
                detectedCountry={state.detectedCountry}
                invalidMsg={invalid}
              />
            ) : isArea ? (
              <textarea
                name={f.value}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.value] ?? ""}
                onChange={(e) => onChange(f.value, e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-ivory/20 bg-ivory/5 px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold/60"
              />
            ) : (
              <input
                type={isEmail ? "email" : "text"}
                name={f.value}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.value] ?? ""}
                onChange={(e) => onChange(f.value, e.target.value)}
                className="w-full rounded-lg border border-ivory/20 bg-ivory/5 px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold/60"
              />
            )}
            {isMissing && !invalid && (
              <p className="mt-1 text-xs text-red-300">{f.label} is required.</p>
            )}
          </div>
        );
      })}

      {compliance.showConsentCheckbox && compliance.consentText && (
        <label className="flex items-start gap-2 text-xs text-ivory/70">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-gold"
          />
          <span>{compliance.consentText}</span>
        </label>
      )}
      {compliance.a2pConsentText && (
        <p className="text-[11px] leading-relaxed text-ivory/50">{compliance.a2pConsentText}</p>
      )}

      {state.captchaRequired && state.captchaStatusMessage && (
        <p className="text-xs text-gold">{state.captchaStatusMessage}</p>
      )}
      {state.error && !state.error.field && (
        <p className="text-xs text-red-300">{state.error.message}</p>
      )}

      <button
        type="submit"
        disabled={submitting || captcha || (compliance.consentRequired && !consent)}
        className="mt-1 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-forest transition-all hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Sending…" : C.submitForm}
      </button>
    </form>
  );
}
