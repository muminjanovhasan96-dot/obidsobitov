"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLocale } from "@/context/LocaleContext";

/** Light / dark (ivory / deep emerald) theme toggle. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${t("theme.label")}: ${isDark ? t("theme.dark") : t("theme.light")}`}
      className="text-emerald transition-colors duration-300 hover:text-gold"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.5} />
      ) : (
        <Moon size={18} strokeWidth={1.5} />
      )}
    </button>
  );
}
