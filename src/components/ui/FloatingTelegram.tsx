"use client";

import { Send } from "lucide-react";
import { site } from "@/config/site";

/** Persistent floating Telegram contact button (bottom-left). */
export function FloatingTelegram() {
  return (
    <a
      href={site.telegram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      className="group fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-ivory shadow-lift transition-all duration-300 hover:bg-gold hover:text-emerald-deep"
    >
      <Send size={19} strokeWidth={1.6} className="transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
