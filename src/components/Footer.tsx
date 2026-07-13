"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Instagram, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { notifyLead } from "@/lib/notify";

const NAV = [
  { href: "/catalog", key: "nav.catalog" },
  { href: "/concierge", key: "nav.concierge" },
  { href: "/about", key: "nav.about" },
  { href: "/cart", key: "nav.cart" },
];

const CATEGORY_LINKS = [
  { href: "/catalog?category=watches", key: "categories.watches" },
  { href: "/catalog?category=clothing", key: "categories.clothing" },
  { href: "/catalog?category=bags", key: "categories.bags" },
  { href: "/catalog?category=accessories", key: "categories.accessories" },
];

// Payment methods shown as simple text chips (swap for real logos later).
const PAYMENTS = ["Payme", "Click", "Uzcard", "Humo"];

export function Footer() {
  const { t } = useLocale();
  const [subscribed, setSubscribed] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (email) void notifyLead("Newsletter", `Obuna: ${email}`);
    setSubscribed(true);
  }

  return (
    <footer className="border-t border-gold/30 bg-emerald-deep text-ivory">
      <div className="mx-auto max-w-shell px-6 py-16 md:px-10 md:py-20">
        {/* Top — brand + newsletter */}
        <div className="grid gap-12 border-b border-ivory/15 pb-14 md:grid-cols-2 md:gap-16">
          <div>
            <Logo tone="ivory" />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ivory/60">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="md:pl-8">
            <h3 className="font-serif text-xl text-ivory">
              {t("footer.newsletter.title")}
            </h3>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ivory/60">
              {t("footer.newsletter.text")}
            </p>

            {subscribed ? (
              <p className="mt-6 text-[13px] text-gold">
                {t("footer.newsletter.success")}
              </p>
            ) : (
              <form
                onSubmit={onSubscribe}
                className="mt-6 flex max-w-sm items-center border-b border-ivory/25 focus-within:border-gold"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t("footer.newsletter.placeholder")}
                  className="w-full bg-transparent py-3 text-[14px] text-ivory placeholder:text-ivory/40 focus:outline-none"
                  aria-label={t("footer.newsletter.placeholder")}
                />
                <button
                  type="submit"
                  className="shrink-0 pl-3 text-ivory/70 transition-colors hover:text-gold"
                  aria-label={t("footer.newsletter.button")}
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle — link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          {/* Explore */}
          <div>
            <h4 className="eyebrow mb-5">{t("footer.exploreTitle")}</h4>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ivory/70 transition-colors hover:text-gold"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="eyebrow mb-5">{t("home.categories.eyebrow")}</h4>
            <ul className="space-y-3">
              {CATEGORY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ivory/70 transition-colors hover:text-gold"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-5">{t("footer.contactTitle")}</h4>
            <ul className="space-y-4 text-[14px] text-ivory/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>{t("about.contact.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                <a href={`tel:${site.phone.href}`} className="transition-colors hover:text-gold">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  @{site.instagram.handle}
                </a>
              </li>
              <li className="text-[13px] text-ivory/50">{t("footer.hours")}</li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="eyebrow mb-5">{t("footer.paymentTitle")}</h4>
            <div className="flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span
                  key={p}
                  className="border border-ivory/20 px-3 py-1.5 text-[11px] uppercase tracking-wide text-ivory/70"
                >
                  {p}
                </span>
              ))}
            </div>
            <a
              href={site.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-ivory/70 transition-colors hover:text-gold"
            >
              <Send size={15} strokeWidth={1.5} />
              Telegram
            </a>
          </div>
        </div>

        {/* Bottom — copyright */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-ivory/15 pt-8 text-[12px] text-ivory/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} OBID SOBITOV. {t("footer.rights")}
          </p>
          <p className="tracking-wide">{t("footer.crafted")}</p>
        </div>
      </div>
    </footer>
  );
}
