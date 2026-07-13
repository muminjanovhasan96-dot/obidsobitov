"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatPrice } from "@/lib/format";
import { products } from "@/data/products";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Focus the field once the panel has animated in.
      const id = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        const cat = t(`categories.${p.category}`).toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          cat.includes(q)
        );
      })
      .slice(0, 6);
  }, [query, t]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-emerald-deep/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 top-0 z-[71] border-b border-line bg-base"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto max-w-shell px-6 py-6 md:px-10 md:py-8">
              {/* Field */}
              <div className="flex items-center gap-4 border-b border-line-strong pb-4">
                <Search size={20} strokeWidth={1.5} className="text-gold" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("search.placeholder")}
                  className="w-full bg-transparent font-serif text-2xl text-emerald placeholder:text-muted/50 focus:outline-none md:text-3xl"
                  aria-label={t("search.title")}
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("nav.close")}
                  className="text-muted transition-colors hover:text-gold"
                >
                  <X size={24} strokeWidth={1.4} />
                </button>
              </div>

              {/* Results */}
              <div className="mt-6 min-h-[80px]">
                {query.trim() === "" ? (
                  <p className="text-[13px] text-muted">{t("search.hint")}</p>
                ) : results.length === 0 ? (
                  <p className="text-[14px] text-muted">
                    {t("search.noResults")}
                  </p>
                ) : (
                  <>
                    <p className="mb-4 text-[11px] uppercase tracking-label text-muted">
                      {t("search.results", { count: results.length })}
                    </p>
                    <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                      {results.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 border-b border-line py-3"
                          >
                            <div className="relative aspect-square w-14 shrink-0 overflow-hidden bg-surface">
                              <SafeImage
                                src={p.images[0]}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] uppercase tracking-label text-muted">
                                {p.brand}
                              </span>
                              <p className="truncate font-serif text-[15px] text-emerald transition-colors group-hover:text-gold">
                                {p.name}
                              </p>
                            </div>
                            <span className="nums shrink-0 text-[12px] text-muted">
                              {formatPrice(p.priceUzs, locale)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
