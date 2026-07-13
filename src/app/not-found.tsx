"use client";

import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="font-serif text-[clamp(4rem,16vw,10rem)] leading-none text-gold/40">
        404
      </span>
      <h1 className="mt-4 font-serif text-3xl text-emerald">
        {t("notFound.title")}
      </h1>
      <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
        {t("notFound.text")}
      </p>
      <div className="mt-8">
        <Button href="/" variant="gold-solid" size="lg">
          {t("notFound.cta")}
        </Button>
      </div>
    </div>
  );
}
