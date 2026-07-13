"use client";

import { useLocale } from "@/context/LocaleContext";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { RevealLines } from "@/components/ui/RevealLines";

const ITEMS = ["one", "two", "three"] as const;

export function Testimonials() {
  const { t } = useLocale();

  return (
    <Section className="border-t border-line">
      {/* Header */}
      <div className="mb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="nums text-[11px] tracking-widest text-gold">N°05</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="text-[11px] uppercase tracking-label text-muted">
            {t("testimonials.eyebrow")}
          </span>
        </div>
        <RevealLines
          as="h2"
          trigger="inView"
          lines={[t("testimonials.title")]}
          className="display max-w-2xl text-4xl md:text-5xl"
        />
      </div>

      <StaggerGroup className="grid gap-px overflow-hidden border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
        {ITEMS.map((key) => (
          <StaggerItem key={key} className="flex flex-col gap-6 py-10 md:px-10">
            <span className="font-serif text-5xl leading-none text-gold/50">“</span>
            <p className="font-serif text-lg italic leading-relaxed text-ink">
              {t(`testimonials.items.${key}.text`)}
            </p>
            <div className="mt-auto">
              <p className="text-[13px] font-medium text-emerald">
                {t(`testimonials.items.${key}.author`)}
              </p>
              <p className="text-[12px] text-muted">
                {t(`testimonials.items.${key}.role`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
