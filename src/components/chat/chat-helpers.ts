import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

/* Media kind from attachment URL */
export const mediaKind = (u: string) =>
  /\.(mp4|mov|webm)(\?|$)/i.test(u)
    ? "video"
    : /\.(mp3|m4a|wav|ogg)(\?|$)/i.test(u)
      ? "audio"
      : /\.(png|jpe?g|gif|webp|heic)(\?|$)/i.test(u)
        ? "image"
        : "file";

export const fmtTime = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

/* Country code → display name (lightweight, no extra dep) */
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export const regionName = (c: string) => {
  try {
    return regionNames.of(c) ?? c;
  } catch {
    return c;
  }
};
export const dialLabel = (c: string) => `+${getCountryCallingCode(c as CountryCode)}`;

export { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode };
