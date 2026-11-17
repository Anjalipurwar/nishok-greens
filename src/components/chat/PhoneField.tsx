import { useEffect, useMemo, useRef, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  regionName,
  dialLabel,
  type CountryCode,
} from "./chat-helpers";

interface ContactField {
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  dataType?: string;
}

export function PhoneField({
  field,
  value,
  onChange,
  detectedCountry,
  invalidMsg,
}: {
  field: ContactField;
  value: string;
  onChange: (key: string, val: string) => void;
  detectedCountry?: string;
  invalidMsg?: string;
}) {
  const localeRegion =
    typeof navigator !== "undefined" && navigator.language
      ? (navigator.language.split("-")[1] as CountryCode)
      : "IN";
  const [raw, setRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>(
    (detectedCountry as CountryCode) ?? localeRegion ?? "IN",
  );
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!raw && detectedCountry) setCountry(detectedCountry as CountryCode);
  }, [detectedCountry, raw]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const countries = useMemo(
    () =>
      getCountries()
        .map((c) => ({ c, name: regionName(c), dial: dialLabel(c) }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const update = (text: string, c: CountryCode = country) => {
    setRaw(text);
    const p = parsePhoneNumberFromString(text, c);
    onChange(field.value, p?.isValid() ? p.number : "");
  };

  const filtered = countries.filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="relative flex gap-2">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 rounded-lg border border-ivory/20 bg-ivory/5 px-3 py-2.5 text-sm text-ivory transition-colors hover:border-gold/60"
        >
          {dialLabel(country)} ▾
        </button>
        {open && (
          <div
            ref={listRef}
            role="listbox"
            className="absolute z-30 mt-12 w-64 max-h-56 overflow-y-auto rounded-lg border border-ivory/20 bg-forest shadow-2xl"
          >
            <input
              autoFocus
              placeholder="Search country"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full border-b border-ivory/10 bg-transparent px-3 py-2 text-sm text-ivory outline-none placeholder:text-ivory/40"
            />
            {filtered.map((x) => (
              <div
                key={x.c}
                role="option"
                aria-selected={x.c === country}
                onClick={() => {
                  setCountry(x.c as CountryCode);
                  setOpen(false);
                  update(raw, x.c as CountryCode);
                }}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-ivory/10 ${
                  x.c === country ? "text-gold" : "text-ivory"
                }`}
              >
                <span>{x.name}</span>
                <span className="text-ivory/60">{x.dial}</span>
              </div>
            ))}
          </div>
        )}
        <input
          type="tel"
          name={field.value}
          required={field.required}
          placeholder={field.placeholder}
          value={raw}
          onChange={(e) => update(e.target.value)}
          className="flex-1 rounded-lg border border-ivory/20 bg-ivory/5 px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold/60"
        />
      </div>
      {invalidMsg && <p className="mt-1.5 text-xs text-red-300">{invalidMsg}</p>}
    </div>
  );
}

export type { ContactField };
