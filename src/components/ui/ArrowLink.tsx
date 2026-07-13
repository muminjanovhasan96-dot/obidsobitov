"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Refined underlined text link with an arrow that slides on hover. */
export function ArrowLink({
  href,
  children,
  tone = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "gold" | "ink";
  className?: string;
}) {
  const color =
    tone === "gold"
      ? "border-gold text-gold hover:text-gold-hover"
      : "border-line-strong text-ink hover:text-gold hover:border-gold";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 border-b pb-1.5 text-[12px] uppercase tracking-label transition-colors duration-300 ${color} ${className}`}
    >
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
      />
    </Link>
  );
}
