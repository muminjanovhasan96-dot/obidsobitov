"use client";

import { useLocale } from "@/context/LocaleContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { ArrowLink } from "@/components/ui/ArrowLink";

// EDIT: concierge section imagery (personal-shopping / luxury lifestyle).
const IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80";

export function ConciergeTeaser() {
  const { t } = useLocale();

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-shell items-stretch lg:grid-cols-2">
        {/* Image side */}
        <div className="relative min-h-[380px] overflow-hidden bg-emerald-deep lg:min-h-[620px]">
          <SafeImage
            src={IMAGE}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/10 to-emerald-deep/50" />
          {/* Rotated caption */}
          <span className="vertical-rl absolute bottom-8 left-8 text-[10px] uppercase tracking-label text-ivory/80">
            {t("concierge.eyebrow")}
          </span>
        </div>

        {/* Text side */}
        <div className="flex items-center px-8 py-16 md:px-16 md:py-24">
          <div className="max-w-xl">
            <AnimatedReveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="nums text-[11px] tracking-widest text-gold">
                  N°03
                </span>
                <span className="h-px w-8 bg-line-strong" />
                <span className="text-[11px] uppercase tracking-label text-muted">
                  {t("home.concierge.eyebrow")}
                </span>
              </div>
            </AnimatedReveal>

            <RevealLines
              as="h2"
              lines={[t("home.concierge.title")]}
              className="display text-4xl leading-[1.05] md:text-[56px]"
            />

            <AnimatedReveal delay={0.15}>
              <p className="mt-7 text-[15px] leading-relaxed text-muted">
                {t("home.concierge.body")}
              </p>
              <div className="mt-9">
                <ArrowLink href="/concierge">{t("home.concierge.cta")}</ArrowLink>
              </div>
              <p className="mt-10 font-serif text-2xl italic text-ink/40">
                OBID SOBITOV
              </p>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
