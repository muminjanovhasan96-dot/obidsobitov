"use client";

import { useLocale } from "@/context/LocaleContext";
import { formatPrice } from "@/lib/format";

/** Renders a UZS price in the active language, with thousands separators. */
export function PriceTag({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  const { locale } = useLocale();
  return (
    <span className={className}>{formatPrice(amount, locale)}</span>
  );
}
