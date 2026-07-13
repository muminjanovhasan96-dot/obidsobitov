"use client";

import { useLocale } from "@/context/LocaleContext";
import { formatNumber } from "@/lib/format";

/**
 * Dual-thumb price range slider. Two overlaid native range inputs; the lower
 * thumb can never cross the upper. Thumb styling lives in globals.css
 * (.price-range). `step` keeps the values on tidy increments.
 */
export function PriceRange({
  min,
  max,
  value,
  onChange,
  step = 1000000,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
  step?: number;
}) {
  const { t } = useLocale();
  const [lo, hi] = value;
  const span = max - min || 1;
  const pct = (v: number) => ((v - min) / span) * 100;

  return (
    <div>
      <div className="relative flex h-6 items-center">
        {/* Track */}
        <div className="absolute h-px w-full bg-line" />
        {/* Selected span */}
        <div
          className="absolute h-px bg-gold"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          className="price-range"
          min={min}
          max={max}
          step={step}
          value={lo}
          aria-label={t("catalog.filters.min")}
          onChange={(e) =>
            onChange([Math.min(Number(e.target.value), hi), hi])
          }
        />
        <input
          type="range"
          className="price-range"
          min={min}
          max={max}
          step={step}
          value={hi}
          aria-label={t("catalog.filters.max")}
          onChange={(e) =>
            onChange([lo, Math.max(Number(e.target.value), lo)])
          }
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px] text-muted">
        <span>{formatNumber(lo)}</span>
        <span>{formatNumber(hi)}</span>
      </div>
    </div>
  );
}
