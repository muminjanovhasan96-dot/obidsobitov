"use client";

import { useLocale } from "@/context/LocaleContext";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { RevealLines } from "@/components/ui/RevealLines";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { getFeaturedWatches } from "@/data/products";

export function FeaturedTimepieces() {
  const { t } = useLocale();
  const watches = getFeaturedWatches(6);

  return (
    <Section>
      {/* Editorial header */}
      <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="nums text-[11px] tracking-widest text-gold">
              N°01
            </span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="text-[11px] uppercase tracking-label text-muted">
              {t("home.featured.eyebrow")}
            </span>
          </div>
          <RevealLines
            as="h2"
            lines={[t("home.featured.title")]}
            className="display text-4xl md:text-6xl"
          />
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            {t("home.featured.subtitle")}
          </p>
        </div>
        <ArrowLink href="/catalog?category=watches" tone="ink" className="shrink-0">
          {t("home.featured.cta")}
        </ArrowLink>
      </div>

      {/* Grid */}
      <StaggerGroup className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {watches.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} index={i + 1} priority={i < 3} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
