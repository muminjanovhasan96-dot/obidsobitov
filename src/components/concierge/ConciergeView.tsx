"use client";

import { useLocale } from "@/context/LocaleContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { AnimatedReveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { ConciergeForm } from "./ConciergeForm";

const STEPS = ["one", "two", "three"] as const;

export function ConciergeView() {
  const { t } = useLocale();

  return (
    <>
      <PageIntro
        eyebrow={t("concierge.eyebrow")}
        title={t("concierge.title")}
        subtitle={t("concierge.lead")}
      />

      {/* Steps */}
      <Section>
        <StaggerGroup className="grid gap-px overflow-hidden border border-line md:grid-cols-3">
          {STEPS.map((step, i) => (
            <StaggerItem
              key={step}
              className="bg-surface/30 p-8 md:p-10"
            >
              <span className="font-serif text-4xl text-gold/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-xl text-ink">
                {t(`concierge.steps.${step}.title`)}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {t(`concierge.steps.${step}.text`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Form */}
      <Section padded={false} className="pb-24">
        <AnimatedReveal className="mx-auto max-w-2xl">
          <ConciergeForm />
        </AnimatedReveal>
      </Section>
    </>
  );
}
