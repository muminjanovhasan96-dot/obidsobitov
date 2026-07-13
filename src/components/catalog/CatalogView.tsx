"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { FiltersPanel, type Filters } from "./FiltersPanel";
import { SortSelect, type SortKey } from "./SortSelect";
import {
  products,
  categories,
  getBrands,
  priceBounds,
  type Category,
} from "@/data/products";

function isCategory(value: string | null): value is Category {
  return !!value && (categories as string[]).includes(value);
}

export function CatalogView() {
  const { t } = useLocale();
  const searchParams = useSearchParams();

  const initialCategory: Category | "all" = isCategory(
    searchParams.get("category"),
  )
    ? (searchParams.get("category") as Category)
    : "all";

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    brands: [],
    price: [priceBounds.min, priceBounds.max],
  });
  const [sort, setSort] = useState<SortKey>("newest");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Keep in sync if the user navigates via a category link while already here.
  useEffect(() => {
    const param = searchParams.get("category");
    setFilters((f) => ({
      ...f,
      category: isCategory(param) ? (param as Category) : "all",
      brands: [],
    }));
  }, [searchParams]);

  const availableBrands = useMemo(
    () =>
      getBrands(filters.category === "all" ? undefined : filters.category),
    [filters.category],
  );

  const results = useMemo(() => {
    let list = products.filter(
      (p) => filters.category === "all" || p.category === filters.category,
    );
    if (filters.brands.length) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }
    list = list.filter(
      (p) =>
        p.priceUzs >= filters.price[0] && p.priceUzs <= filters.price[1],
    );

    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.priceUzs - b.priceUzs);
    else if (sort === "priceDesc")
      sorted.sort((a, b) => b.priceUzs - a.priceUzs);
    // "newest" keeps the catalog's source order (first = newest).
    return sorted;
  }, [filters, sort]);

  const panelProps = {
    filters,
    availableBrands,
    priceBounds,
    onCategory: (c: Category | "all") =>
      setFilters((f) => ({ ...f, category: c, brands: [] })),
    onToggleBrand: (brand: string) =>
      setFilters((f) => ({
        ...f,
        brands: f.brands.includes(brand)
          ? f.brands.filter((b) => b !== brand)
          : [...f.brands, brand],
      })),
    onPrice: (price: [number, number]) =>
      setFilters((f) => ({ ...f, price })),
    onClear: () =>
      setFilters({
        category: "all",
        brands: [],
        price: [priceBounds.min, priceBounds.max],
      }),
  };

  return (
    <>
      <PageIntro
        eyebrow={t("catalog.eyebrow")}
        title={t("catalog.title")}
        subtitle={t("catalog.subtitle")}
      />

      <div className="mx-auto max-w-shell px-6 py-12 md:px-10 md:py-16">
        {/* Controls bar (wraps on small screens so it never overflows) */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 text-[12px] uppercase tracking-label text-muted transition-colors hover:text-gold lg:hidden"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              {t("catalog.filters.title")}
            </button>
            <span className="text-[13px] text-muted">
              {t("catalog.filters.results", { count: results.length })}
            </span>
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <div className="flex gap-12">
          {/* Sidebar (desktop) */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <FiltersPanel {...panelProps} />
            </div>
          </aside>

          {/* Grid */}
          <div className="min-w-0 flex-1">
            {results.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-ink">
                  {t("catalog.filters.noResults")}
                </p>
                <p className="mt-3 text-[14px] text-muted">
                  {t("catalog.filters.noResultsHint")}
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14"
              >
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <ProductCard product={product} priority={i < 4} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-emerald-deep/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-[86%] max-w-sm overflow-y-auto border-r border-line bg-surface p-6 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="eyebrow">{t("catalog.filters.title")}</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t("nav.close")}
                  className="text-muted hover:text-gold"
                >
                  <X size={22} strokeWidth={1.4} />
                </button>
              </div>
              <FiltersPanel {...panelProps} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
