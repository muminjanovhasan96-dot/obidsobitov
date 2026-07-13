"use client";

import type { ReactNode } from "react";

/**
 * Seamless horizontal marquee. The content is rendered twice back-to-back and
 * translated -50% so the loop is invisible. Pauses on hover, respects
 * reduced-motion (globals.css). Use for brand tickers / guarantee rows.
 */
// Literal class names so Tailwind's JIT keeps them.
const SPEED: Record<string, string> = {
  marquee: "animate-marquee",
  "marquee-slow": "animate-marquee-slow",
  "marquee-reverse": "animate-marquee-reverse",
};

export function Marquee({
  children,
  speed = "marquee",
  className = "",
  fade = true,
}: {
  children: ReactNode;
  speed?: "marquee" | "marquee-slow" | "marquee-reverse";
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${fade ? "marquee-mask" : ""} ${className}`}
    >
      <div className={`marquee-track flex w-max ${SPEED[speed]}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
