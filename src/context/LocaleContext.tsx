"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/i18n/config";
import { messages } from "@/i18n/messages";

const STORAGE_KEY = "obid-locale";

type TranslateVars = Record<string, string | number>;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Resolve a dot-path key, e.g. t("home.hero.cta"). Supports {var} interpolation. */
  t: (key: string, vars?: TranslateVars) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Safely walk a nested object by dot-path. Returns undefined if not found. */
function resolvePath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      obj,
    );
}

function interpolate(template: string, vars?: TranslateVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start from the default locale on both server and first client render to
  // avoid hydration mismatches, then hydrate from localStorage after mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && locales.includes(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* localStorage may be unavailable — fall back to default silently */
    }
  }, []);

  // Keep <html lang> in sync for accessibility & SEO.
  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence errors */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: TranslateVars) => {
      const primary = resolvePath(messages[locale], key);
      if (typeof primary === "string") return interpolate(primary, vars);

      // Fall back to the default locale, then to the raw key (dev signal).
      const fallback = resolvePath(messages[defaultLocale], key);
      if (typeof fallback === "string") return interpolate(fallback, vars);

      return key;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
