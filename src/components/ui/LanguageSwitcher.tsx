"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { localeNames, localeShort, locales, type Locale } from "@/i18n/config";

/**
 * Language switcher. Compact two-letter trigger that opens a small menu of the
 * three languages. Works in the header and inside the mobile drawer.
 */
export function LanguageSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  function choose(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-emerald"
      >
        {localeShort[locale]}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className={`absolute top-full z-50 mt-3 min-w-[150px] overflow-hidden border border-line bg-surface shadow-lift ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(l)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] transition-colors duration-300 ${
                    active
                      ? "text-emerald"
                      : "text-muted hover:bg-surface-2 hover:text-emerald"
                  }`}
                >
                  <span>{localeNames[l]}</span>
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
