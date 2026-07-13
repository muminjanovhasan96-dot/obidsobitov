"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial heading reveal — each line rises out from behind a mask, staggered.
 * Pass the heading already split into lines. Renders a real heading element
 * (`as`) for semantics/SEO while animating inner spans.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.08,
  once = true,
  /** "mount" reveals immediately (default — headings must never depend on a
   *  scroll observer, so they can never get stuck hidden). "inView" reveals on
   *  scroll for secondary, below-the-fold text. */
  trigger = "mount",
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  trigger?: "inView" | "mount";
}) {
  const motionProps = (i: number) =>
    trigger === "mount"
      ? { animate: { y: "0%" } }
      : {
          whileInView: { y: "0%" },
          viewport: { once, margin: "0px 0px -12% 0px" },
        };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "110%" }}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
            {...motionProps(i)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
