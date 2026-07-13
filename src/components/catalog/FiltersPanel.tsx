"use client";

import { useLocale } from "@/context/LocaleContext";
import { PriceRange } from "./PriceRange";
import { categories, type Category } from "@/data/products";

export type Filters = {
  category: Category | "all";
  brands: string[];
  price: [number, number];
};

export function FiltersPanel({
  filters,
  availableBrands,
  priceBounds,
  onCategory,
  onToggleBrand,
  onPrice,
  onClear,
}: {
  filters: Filters;
  availableBrands: string[];
  priceBounds: { min: number; max: number };
  onCategory: (c: Category | "all") => void;
  onToggleBrand: (brand: string) => void;
  onPrice: (range: [number, number]) => void;
  onClear: () => void;
}) {
  const { t } = useLocale();

  const categoryOptions: (Category | "all")[] = ["all", ...categories];

  return (
    <div className="flex flex-col gap-10">
      {/* Category */}
      <div>
        <h3 className="eyebrow mb-5">{t("catalog.filters.category")}</h3>
        <ul className="flex flex-col gap-1">
          {categoryOptions.map((c) => {
            const active = filters.category === c;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => onCategory(c)}
                  className={`group flex w-full items-center gap-3 py-1.5 text-left text-[14px] transition-colors duration-300 ${
                    active ? "text-emerald" : "text-muted hover:text-emerald"
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      active ? "w-6 bg-gold" : "w-3 bg-line group-hover:w-5"
                    }`}
                  />
                  {c === "all" ? t("categories.all") : t(`categories.${c}`)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Brand */}
      {availableBrands.length > 0 ? (
        <div>
          <h3 className="eyebrow mb-5">{t("catalog.filters.brand")}</h3>
          <ul className="flex flex-col gap-3">
            {availableBrands.map((brand) => {
              const checked = filters.brands.includes(brand);
              return (
                <li key={brand}>
                  <label className="flex cursor-pointer items-center gap-3 text-[14px] text-muted transition-colors hover:text-ink">
                    <span
                      className={`flex h-4 w-4 items-center justify-center border transition-colors ${
                        checked
                          ? "border-gold bg-gold/10"
                          : "border-line"
                      }`}
                    >
                      {checked ? (
                        <span className="h-1.5 w-1.5 bg-gold" />
                      ) : null}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => onToggleBrand(brand)}
                    />
                    <span className={checked ? "text-ink" : ""}>{brand}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* Price */}
      <div>
        <h3 className="eyebrow mb-5">{t("catalog.filters.price")}</h3>
        <PriceRange
          min={priceBounds.min}
          max={priceBounds.max}
          value={filters.price}
          onChange={onPrice}
        />
      </div>

      <button
        type="button"
        onClick={onClear}
        className="self-start text-[11px] uppercase tracking-label text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
      >
        {t("catalog.filters.clear")}
      </button>
    </div>
  );
}
