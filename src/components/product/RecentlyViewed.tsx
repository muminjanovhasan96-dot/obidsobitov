"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { ProductCard } from "@/components/ProductCard";
import { GoldRule } from "@/components/ui/Section";
import { trackView, getRecentIds } from "@/lib/recent";
import { products, type Product } from "@/data/products";

/**
 * Records the current product as viewed, then shows other recently-viewed
 * pieces (excluding this one). Renders nothing until there's something to show.
 */
export function RecentlyViewed({ currentId }: { currentId: string }) {
  const { t } = useLocale();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    // Read previous history *before* recording the current view.
    const previous = getRecentIds().filter((id) => id !== currentId);
    const list = previous
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 4);
    setItems(list);
    trackView(currentId);
  }, [currentId]);

  if (items.length === 0) return null;

  return (
    <div className="mt-24">
      <GoldRule className="mb-14" />
      <h2 className="mb-10 text-center font-serif text-2xl text-emerald md:text-3xl">
        {t("recently.title")}
      </h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
