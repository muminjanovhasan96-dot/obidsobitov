"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { RevealLines } from "@/components/ui/RevealLines";
import { Button } from "@/components/ui/Button";

// EDIT: swap this for the client's own hero photography.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="grid min-h-[calc(100svh-var(--header-h))] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      {/* Text panel */}
      <div className="order-2 flex flex-col justify-center px-8 py-16 md:px-14 lg:order-1 lg:px-16 lg:py-0 xl:px-24">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {t("home.hero.eyebrow")}
        </motion.span>

        <RevealLines
          as="h1"
          trigger="mount"
          lines={["OBID", "SOBITOV"]}
          delay={0.35}
          stagger={0.12}
          className="display mt-6 font-serif text-[clamp(3rem,9vw,7rem)] uppercase tracking-[0.02em] text-emerald"
        />

        <motion.div
          className="mt-8 h-px w-16 bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
        />

        <motion.p
          className="mt-8 max-w-md font-serif text-xl italic text-ink md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.85 }}
        >
          {t("home.hero.tagline")}
        </motion.p>

        <motion.p
          className="mt-5 max-w-md text-[15px] leading-relaxed text-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.95 }}
        >
          {t("home.hero.sub")}
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.05 }}
        >
          <Button href="/catalog" variant="gold-solid" size="lg">
            {t("home.hero.cta")}
          </Button>
          <ArrowLink href="/concierge" tone="ink">
            {t("home.hero.ctaSecondary")}
          </ArrowLink>
        </motion.div>

        {/* Editorial meta */}
        <motion.div
          className="mt-14 flex items-center gap-6 text-[10px] uppercase tracking-label text-muted/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <span>Est. · Tashkent</span>
          <span className="h-px w-8 bg-line-strong" />
          <span>N°01 — Maison</span>
        </motion.div>
      </div>

      {/* Image panel */}
      <div className="relative order-1 min-h-[46vh] overflow-hidden bg-emerald-deep lg:order-2 lg:min-h-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <SafeImage
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        {/* thin gold frame */}
        <div
          className="pointer-events-none absolute inset-5 border border-gold/25 md:inset-8"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
