/**
 * ------------------------------------------------------------------
 *  SITE / CONTACT CONFIGURATION
 * ------------------------------------------------------------------
 *  This is the ONE place to edit the brand's contact details.
 *  Everything (header, footer, product pages, concierge form, checkout)
 *  reads from here. Change a value once and it updates everywhere.
 */
export const site = {
  name: "OBID SOBITOV",

  // Public site URL (used for metadata / Open Graph). Update after deploy.
  url: "https://obidsobitov.uz",

  // ---- Contact ----------------------------------------------------
  phone: {
    // Display version (with spaces) and the tel: link version (digits only, +)
    display: "+998 99 777 07 00",
    href: "+998997770700",
  },

  // Instagram handle (without the @) and full URL
  instagram: {
    handle: "obidsobitov_",
    url: "https://instagram.com/obidsobitov_",
  },

  // Telegram — used for "Ask via Telegram" deep links and the order fallback.
  // Set `username` to the boutique's Telegram username (without the @).
  // Deep links are built as https://t.me/<username>?text=<prefilled message>.
  telegram: {
    username: "obidsobitov_",
    url: "https://t.me/obidsobitov_",
  },

  // ---- Address ----------------------------------------------------
  address: {
    line: "Mirabad Avenue, Tashkent, Uzbekistan",
    // Google Maps embed query (edit to the exact pin when available).
    mapQuery: "Mirabad, Tashkent, Uzbekistan",
  },

  currency: "UZS",
} as const;

/**
 * Build a Telegram deep link with a pre-filled message.
 * Usage: telegramLink("Hello, I'm interested in …")
 */
export function telegramLink(message: string): string {
  return `https://t.me/${site.telegram.username}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Google Maps embed URL for the About page (no API key required). */
export function mapEmbedUrl(): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.mapQuery,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

/** Plain "open in Google Maps" link (works everywhere, no embed needed). */
export function mapLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address.mapQuery,
  )}`;
}
