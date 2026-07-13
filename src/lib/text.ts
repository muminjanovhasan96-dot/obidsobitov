import type { Locale } from "@/i18n/config";
import type { Localizable, LocalizedText } from "@/data/products";

/** Resolve a Localizable (plain string OR { uz, ru, en }) to the active locale. */
export function resolveText(value: Localizable, locale: Locale): string {
  if (typeof value === "string") return value;
  return (value as LocalizedText)[locale];
}
