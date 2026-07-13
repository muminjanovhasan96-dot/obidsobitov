"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export type SortKey = "newest" | "priceAsc" | "priceDesc";

const OPTIONS: SortKey[] = ["newest", "priceAsc", "priceDesc"];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-3 border border-line px-4 py-2.5 text-[12px] text-muted transition-colors hover:border-gold hover:text-emerald"
      >
        <span className="uppercase tracking-wide text-muted/70">
          {t("catalog.sort.label")}:
        </span>
        <span className="text-ink">{t(`catalog.sort.${value}`)}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-30 mt-2 min-w-[220px] border border-line bg-surface shadow-lift"
        >
          {OPTIONS.map((key) => {
            const active = key === value;
            return (
              <li key={key} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] transition-colors ${
                    active
                      ? "text-emerald"
                      : "text-muted hover:bg-surface-2 hover:text-emerald"
                  }`}
                >
                  {t(`catalog.sort.${key}`)}
                  {active ? <Check size={14} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
