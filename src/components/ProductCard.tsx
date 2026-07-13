"use client";

import Link from "next/link";
import { Plus, Check, Heart } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PriceTag } from "@/components/ui/PriceTag";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Product } from "@/data/products";

/**
 * Editorial product card. No border — clean white image field + quiet meta.
 * Hover: gentle zoom, an emerald veil with a gold "View" line, and a quick-add.
 */
export function ProductCard({
  product,
  priority = false,
  index,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const { t } = useLocale();
  const { add, openDrawer } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const saved = has(product.id);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    add(product.id, 1);
    setAdded(true);
    openDrawer();
    window.setTimeout(() => setAdded(false), 1500);
  }

  function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product.id);
  }

  return (
    <div className="group relative">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`${product.brand} ${product.name}`}
        >
          <SafeImage
            src={product.images[0]}
            alt={`${product.brand} — ${product.name}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1300ms] ease-lux group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-5 left-5 flex translate-y-2 items-center gap-2 text-[11px] uppercase tracking-label text-gold opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
            <span className="h-px w-5 bg-gold" />
            {t("actions.view")}
          </span>
        </Link>

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={t("wishlist.add")}
          aria-pressed={saved}
          className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-base/80 backdrop-blur-md transition-all duration-300 ${
            saved
              ? "border-gold text-gold opacity-100"
              : "border-line text-emerald opacity-0 hover:border-gold hover:text-gold group-hover:opacity-100"
          }`}
        >
          <Heart size={15} strokeWidth={1.6} fill={saved ? "#C2A15A" : "none"} />
        </button>

        {/* Quick add */}
        <button
          type="button"
          onClick={quickAdd}
          aria-label={t("actions.addToCart")}
          className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-base/80 text-emerald opacity-0 backdrop-blur-md transition-all duration-500 ease-lux hover:border-gold hover:text-gold group-hover:opacity-100"
        >
          {added ? <Check size={16} /> : <Plus size={16} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Meta */}
      <Link href={`/product/${product.slug}`} className="mt-4 block">
        <div className="flex items-center gap-3">
          {typeof index === "number" ? (
            <span className="nums text-[10px] tracking-widest text-gold">
              {`N°${String(index).padStart(2, "0")}`}
            </span>
          ) : null}
          <span className="text-[10px] uppercase tracking-label text-muted">
            {product.brand}
          </span>
          {product.availability === "onOrder" ? (
            <span className="ml-auto text-[10px] uppercase tracking-label text-gold">
              {t("product.onOrder")}
            </span>
          ) : null}
        </div>
        <h3 className="mt-1.5 font-serif text-[17px] leading-snug text-emerald transition-colors duration-300 group-hover:text-gold">
          {product.name}
        </h3>
        <PriceTag
          amount={product.priceUzs}
          className="nums mt-1.5 block text-[13px] text-muted"
        />
      </Link>
    </div>
  );
}
