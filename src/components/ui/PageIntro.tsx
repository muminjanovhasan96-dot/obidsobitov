"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RevealLines } from "./RevealLines";

/**
 * Editorial inner-page intro. Clears the fixed header, then shows a left-aligned
 * gold eyebrow row + large display title (line-revealed) + optional subtitle.
 * Used by Catalog, Concierge, Cart, Checkout, About.
 */
export function PageIntro({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-shell px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        {eyebrow ? (
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block h-1 w-1 rotate-45 bg-gold" />
            <span className="text-[11px] uppercase tracking-label text-muted">
              {eyebrow}
            </span>
          </motion.div>
        ) : null}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealLines
            as="h1"
            trigger="mount"
            lines={[title]}
            className="display max-w-4xl text-5xl md:text-7xl"
          />
          {subtitle ? (
            <p className="max-w-sm text-[15px] leading-relaxed text-muted md:pb-2">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
