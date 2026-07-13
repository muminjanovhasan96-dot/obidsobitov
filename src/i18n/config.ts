/**
 * i18n configuration.
 *
 * Three languages are supported. UZ (Uzbek) is the default, followed by RU
 * (Russian) and EN (English). To change the default, edit `defaultLocale`.
 * UI copy lives in /messages/{uz,ru,en}.json — product copy lives inline in
 * src/data/products.ts.
 */
export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

/** Full language name, shown in the language menu. */
export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

/** Two-letter label, shown in the compact header switcher. */
export const localeShort: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

/** <html lang="…"> value for each locale. */
export const localeHtmlLang: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};
