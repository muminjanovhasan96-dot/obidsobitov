"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { RevealLines } from "@/components/ui/RevealLines";
import { ArrowLink } from "@/components/ui/ArrowLink";

// EDIT: full-bleed editorial / lookbook image.
const IMAGE =
  "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=2000&q=80";

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-bleed editorial "moment" — a styled campaign break in the page. */
export function Lookbook() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-emerald-deep">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      >
        <SafeImage
          src={IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-emerald-deep/55" />
      <div
        className="pointer-events-none absolute inset-5 border border-gold/25 md:inset-8"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("lookbook.eyebrow")}
        </motion.span>
        <RevealLines
          as="h2"
          trigger="inView"
          lines={[t("lookbook.title")]}
          className="display mt-6 text-4xl text-ivory md:text-6xl"
        />
        <motion.p
          className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        >
          {t("lookbook.body")}
        </motion.p>
        <div className="mt-9 flex justify-center">
          <ArrowLink href="/catalog">{t("lookbook.cta")}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
