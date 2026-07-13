"use client";

import { Heart } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useWishlist } from "@/context/WishlistContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";

export function WishlistView() {
  const { t } = useLocale();
  const { items, isReady } = useWishlist();

  if (isReady && items.length === 0) {
    return (
      <>
        <PageIntro title={t("wishlist.title")} />
        <div className="mx-auto flex max-w-shell flex-col items-center px-6 py-28 text-center">
          <Heart size={38} strokeWidth={1} className="text-gold/50" />
          <h2 className="mt-6 font-serif text-2xl text-emerald">
            {t("wishlist.empty")}
          </h2>
          <p className="mt-3 max-w-sm text-[14px] text-muted">
            {t("wishlist.emptyHint")}
          </p>
          <div className="mt-8">
            <Button href="/catalog" variant="gold-solid" size="lg">
              {t("cart.browse")}
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageIntro
        title={t("wishlist.title")}
        subtitle={t("wishlist.subtitle")}
      />
      <div className="mx-auto max-w-shell px-6 py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6 md:gap-y-16">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      </div>
    </>
  );
}
