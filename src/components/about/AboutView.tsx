"use client";

import { ShieldCheck, Lock, Sparkles, MapPin, Phone, Instagram, Clock } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section, GoldRule } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedReveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { site, mapEmbedUrl, mapLink } from "@/config/site";

// EDIT: brand / boutique interior photography.
const STORY_IMAGE =
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=80";

const VALUES = [
  { icon: ShieldCheck, key: "authenticity" },
  { icon: Lock, key: "discretion" },
  { icon: Sparkles, key: "care" },
] as const;

export function AboutView() {
  const { t } = useLocale();

  return (
    <>
      <PageIntro
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.lead")}
      />

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedReveal className="relative aspect-[4/5] overflow-hidden bg-surface">
            <SafeImage
              src={STORY_IMAGE}
              alt="OBID SOBITOV"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <span className="eyebrow">{t("brand.signature")}</span>
            <h2 className="mt-5 text-3xl leading-tight md:text-[40px] md:leading-[1.1]">
              {t("about.storyTitle")}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              {t("about.story1")}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              {t("about.story2")}
            </p>
          </AnimatedReveal>
        </div>
      </Section>

      {/* Values */}
      <Section padded={false} className="pb-4">
        <GoldRule className="mb-16" />
        <StaggerGroup className="grid gap-10 md:grid-cols-3 md:gap-8">
          {VALUES.map(({ icon: Icon, key }) => (
            <StaggerItem key={key} className="flex flex-col items-start gap-4">
              <Icon size={26} strokeWidth={1.2} className="text-gold" />
              <h3 className="font-serif text-xl text-ink">
                {t(`about.values.${key}.title`)}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">
                {t(`about.values.${key}.text`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Contact + map */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          <div>
            <span className="eyebrow">{t("brand.name")}</span>
            <h2 className="mt-5 text-3xl md:text-[36px]">
              {t("about.contact.title")}
            </h2>

            <ul className="mt-10 space-y-7">
              <ContactRow icon={MapPin} label={t("about.contact.addressLabel")}>
                {t("about.contact.address")}
              </ContactRow>
              <ContactRow icon={Phone} label={t("about.contact.phoneLabel")}>
                <a
                  href={`tel:${site.phone.href}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.phone.display}
                </a>
              </ContactRow>
              <ContactRow
                icon={Instagram}
                label={t("about.contact.instagramLabel")}
              >
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  @{site.instagram.handle}
                </a>
              </ContactRow>
              <ContactRow icon={Clock} label={t("about.contact.hoursLabel")}>
                {t("about.contact.hours")}
              </ContactRow>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={site.telegram.url} external variant="gold-solid">
                Telegram
              </Button>
              <Button href={`tel:${site.phone.href}`} external variant="gold-outline">
                {t("actions.call")}
              </Button>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface lg:aspect-auto lg:h-full lg:min-h-[420px]">
              {/* Fallback shown if the embed is blocked; the iframe paints over it */}
              <a
                href={mapLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 text-center"
              >
                <MapPin size={24} strokeWidth={1.2} className="text-gold/60" />
                <span className="text-[13px] text-muted">
                  {t("about.contact.address")}
                </span>
              </a>
              <iframe
                title={t("about.contact.mapTitle")}
                src={mapEmbedUrl()}
                className="absolute inset-0 z-10 h-full w-full grayscale-[0.3] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[11px] uppercase tracking-label text-muted transition-colors hover:text-gold"
            >
              {t("about.contact.mapTitle")} →
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <Icon size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
      <div>
        <span className="text-[11px] uppercase tracking-label text-muted">
          {label}
        </span>
        <p className="mt-1 text-[15px] text-ink">{children}</p>
      </div>
    </li>
  );
}
