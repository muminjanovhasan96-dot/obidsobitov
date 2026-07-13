"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Premium welcome intro. Ivory curtain with the monogram + wordmark, shown once
 * per browser session (sessionStorage), then lifts away to reveal the site.
 * Falls back to hidden for no-JS users via a <noscript> style in the layout.
 */
export function Preloader() {
  const { t } = useLocale();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let welcomed = false;
    try {
      welcomed = sessionStorage.getItem("obid-welcomed") === "1";
    } catch {
      /* sessionStorage unavailable */
    }
    if (welcomed) {
      setShow(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("obid-welcomed", "1");
      } catch {
        /* ignore */
      }
    }, 2300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <Image
              src="/monogram.svg"
              alt="OBID SOBITOV"
              width={64}
              height={64}
              priority
            />
            <div className="mt-7 overflow-hidden">
              <motion.h1
                className="font-serif text-2xl tracking-[0.3em] text-emerald md:text-3xl"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.35 }}
              >
                OBID&nbsp;SOBITOV
              </motion.h1>
            </div>

            <motion.span
              className="mt-3 text-[11px] uppercase tracking-[0.4em] text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              Boutique
            </motion.span>

            {/* Gold hairline draws in */}
            <motion.div
              className="mt-6 h-px bg-gold/70"
              initial={{ width: 0 }}
              animate={{ width: 72 }}
              transition={{ duration: 0.9, ease, delay: 0.7 }}
            />

            <motion.span
              className="mt-6 text-[10px] uppercase tracking-label text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              {t("intro.tagline")}
            </motion.span>
            <motion.span
              className="mt-2 font-serif text-base italic text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {t("intro.welcome")}
            </motion.span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
