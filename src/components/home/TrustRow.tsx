"use client";

import { ShieldCheck, BadgeCheck, Truck, Lock } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

const ITEMS = [
  { icon: ShieldCheck, key: "original" },
  { icon: BadgeCheck, key: "warranty" },
  { icon: Truck, key: "delivery" },
  { icon: Lock, key: "payment" },
] as const;

export function TrustRow() {
  const { t } = useLocale();

  return (
    <Section>
      <StaggerGroup className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, key }, i) => (
          <StaggerItem
            key={key}
            className="flex flex-col gap-5 px-0 py-10 sm:px-8 md:py-12 lg:first:pl-0 lg:last:pr-0"
          >
            <div className="flex items-center gap-3">
              <span className="nums text-[11px] tracking-widest text-gold">
                0{i + 1}
              </span>
              <Icon size={18} strokeWidth={1.2} className="text-gold" />
            </div>
            <h3 className="font-serif text-lg text-ink">
              {t(`home.trust.${key}.title`)}
            </h3>
            <p className="text-[13px] leading-relaxed text-muted">
              {t(`home.trust.${key}.text`)}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
