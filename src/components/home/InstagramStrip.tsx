"use client";

import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { Section } from "@/components/ui/Section";
import { SafeImage } from "@/components/ui/SafeImage";
import { RevealLines } from "@/components/ui/RevealLines";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { site } from "@/config/site";
import { useProducts } from "@/context/ProductsContext";

export function InstagramStrip() {
  const { t } = useLocale();
  const { products } = useProducts();
  // A handful of images to evoke the feed. EDIT: point at real @obidsobitov_ posts.
  const FEED = products.slice(0, 6).map((p) => p.images[0]);

  return (
    <Section className="border-t border-line">
      {/* Editorial header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="nums text-[11px] tracking-widest text-gold">
              N°04
            </span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="text-[11px] uppercase tracking-label text-muted">
              {t("home.instagram.eyebrow")}
            </span>
          </div>
          <RevealLines
            as="h2"
            lines={[t("home.instagram.title")]}
            className="display max-w-xl text-3xl md:text-5xl"
          />
        </div>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border-b border-gold pb-1.5 text-[12px] uppercase tracking-label text-gold transition-colors duration-300 hover:text-gold-hover"
        >
          {t("home.instagram.handle")}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-500 ease-lux group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>

      <StaggerGroup className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {FEED.map((src, i) => (
          <StaggerItem key={i}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-surface"
              aria-label={t("home.instagram.cta")}
            >
              <SafeImage
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover opacity-80 transition-all duration-700 ease-lux group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-deep/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ArrowUpRight size={20} strokeWidth={1.4} className="text-gold" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
