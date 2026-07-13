"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Section } from "@/components/ui/Section";
import { SafeImage } from "@/components/ui/SafeImage";
import { RevealLines } from "@/components/ui/RevealLines";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import type { Category } from "@/data/products";

// EDIT: representative image per category.
const TILES: { category: Category; image: string }[] = [
  {
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CategoryGrid() {
  const { t } = useLocale();

  return (
    <Section className="bg-base">
      {/* Editorial header */}
      <div className="mb-12 border-b border-line pb-10">
        <div className="mb-5 flex items-center gap-4">
          <span className="nums text-[11px] tracking-widest text-gold">N°02</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="text-[11px] uppercase tracking-label text-muted">
            {t("home.categories.eyebrow")}
          </span>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <RevealLines
            as="h2"
            lines={[t("home.categories.title")]}
            className="display max-w-2xl text-4xl md:text-6xl"
          />
          <p className="max-w-xs text-[14px] leading-relaxed text-muted">
            {t("home.categories.subtitle")}
          </p>
        </div>
      </div>

      <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {TILES.map(({ category, image }, i) => (
          <StaggerItem key={category}>
            <Link
              href={`/catalog?category=${category}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-surface"
            >
              <SafeImage
                src={image}
                alt={t(`categories.${category}`)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-all duration-[1300ms] ease-lux group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/25 to-emerald-deep/40" />

              {/* Index */}
              <span className="nums absolute left-5 top-5 text-[11px] tracking-widest text-ivory/70">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Hover arrow */}
              <span className="absolute right-5 top-5 text-ivory/70 opacity-0 transition-all duration-500 ease-lux group-hover:opacity-100 group-hover:text-gold">
                <ArrowUpRight size={18} strokeWidth={1.4} />
              </span>

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-serif text-xl text-ivory transition-colors duration-300 group-hover:text-gold md:text-2xl">
                  {t(`categories.${category}`)}
                </span>
                <span className="mt-3 block h-px w-6 bg-gold/60 transition-all duration-500 ease-lux group-hover:w-14" />
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
