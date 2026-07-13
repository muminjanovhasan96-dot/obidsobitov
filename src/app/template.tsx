"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Route transition. `template.tsx` remounts on every navigation, so this gives
 * a soft cross-fade between pages. Opacity-only (no transform) so it never
 * interferes with position: sticky elements.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
