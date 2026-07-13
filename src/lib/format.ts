import type { Locale } from "@/i18n/config";

/**
 * Format a UZS amount with thousands separators, e.g. 125000000 → "125 000 000".
 * We use a locale-aware grouping but always render the "so'm" / "сум" / "UZS"
 * suffix ourselves so the wording matches the active language.
 */
const currencyLabel: Record<Locale, string> = {
  uz: "so'm",
  ru: "сум",
  en: "UZS",
};

export function formatPrice(amount: number, locale: Locale = "uz"): string {
  // Group with thin spaces via a fixed 'ru-RU'-style grouping (space separator).
  const grouped = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(amount);
  // Intl uses non-breaking spaces ( ); keep them — they render as spaces.
  return `${grouped} ${currencyLabel[locale]}`;
}

/** Grouped number without the currency suffix (for compact contexts). */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    amount,
  );
}
