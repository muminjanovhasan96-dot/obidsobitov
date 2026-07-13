"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Send,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewed } from "./RecentlyViewed";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { GoldRule } from "@/components/ui/Section";
import { resolveText } from "@/lib/text";
import { formatPrice } from "@/lib/format";
import { telegramLink } from "@/config/site";
import { getRelatedProducts, type Product } from "@/data/products";

export function ProductView({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  const { add, openDrawer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const related = getRelatedProducts(product, 4);
  const priceLabel = formatPrice(product.priceUzs, locale);

  function handleAdd() {
    add(product.id, quantity);
    setJustAdded(true);
    openDrawer();
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  const tgMessage = t("product.telegramMessage", {
    name: product.name,
    brand: product.brand,
    price: priceLabel,
  });

  return (
    <div>
      <div className="mx-auto max-w-shell px-6 pb-24 pt-10 md:px-10 md:pt-14">
        {/* Back link */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-muted transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          {t("actions.backToCatalog")}
        </Link>

        {/* Main */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <ProductGallery
              images={product.images}
              alt={`${product.brand} ${product.name}`}
            />
          </div>

          {/* Info */}
          <div className="min-w-0 lg:pt-4">
            <span className="text-[11px] uppercase tracking-label text-muted">
              {product.brand}
            </span>
            <h1 className="mt-3 text-3xl leading-tight md:text-[38px] md:leading-[1.1]">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <span className="font-serif text-2xl text-emerald">
                {priceLabel}
              </span>
              <span className="text-[11px] uppercase tracking-label text-muted">
                ·{" "}
                {product.availability === "onOrder"
                  ? t("product.onOrder")
                  : t("product.inStock")}
              </span>
            </div>

            <GoldRule className="my-8" />

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-muted">
              {resolveText(product.description, locale)}
            </p>

            {/* Quantity + actions */}
            <div className="mt-9 flex flex-col gap-4">
              <div className="flex items-center gap-5">
                <span className="text-[11px] uppercase tracking-label text-muted">
                  {t("product.quantity")}
                </span>
                <div className="flex items-center border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-gold"
                    aria-label="−"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center text-[14px] text-ink">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-gold"
                    aria-label="+"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Stacked full-width so the long UZ/RU labels never overflow
                  the narrow info column at intermediate desktop widths. */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleAdd}
                  variant="gold-solid"
                  size="lg"
                  className="w-full"
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      {t("actions.added")}
                    </>
                  ) : (
                    t("actions.addToCart")
                  )}
                </Button>
                <Button
                  href={telegramLink(tgMessage)}
                  external
                  variant="gold-outline"
                  size="lg"
                  className="w-full"
                >
                  <Send size={15} />
                  {t("actions.askTelegram")}
                </Button>
              </div>
            </div>

            {/* Reassurance */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 border border-line p-4">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.3}
                  className="mt-0.5 shrink-0 text-gold"
                />
                <div>
                  <h3 className="text-[13px] font-medium text-ink">
                    {t("product.authenticity.title")}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">
                    {t("product.authenticity.text")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border border-line p-4">
                <Truck
                  size={20}
                  strokeWidth={1.3}
                  className="mt-0.5 shrink-0 text-gold"
                />
                <div>
                  <h3 className="text-[13px] font-medium text-ink">
                    {t("product.delivery.title")}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">
                    {t("product.delivery.text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Specs */}
            {product.specs.length > 0 ? (
              <div className="mt-10">
                <h2 className="eyebrow mb-5">{t("product.specs")}</h2>
                <dl className="divide-y divide-line border-t border-line">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-baseline justify-between gap-6 py-3.5"
                    >
                      <dt className="text-[13px] text-muted">
                        {resolveText(spec.label, locale)}
                      </dt>
                      <dd className="text-right text-[13px] text-ink">
                        {resolveText(spec.value, locale)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <div className="mt-24">
            <GoldRule className="mb-14" />
            <AnimatedReveal>
              <h2 className="mb-10 text-center font-serif text-2xl md:text-3xl">
                {t("product.related")}
              </h2>
            </AnimatedReveal>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : null}

        {/* Recently viewed */}
        <RecentlyViewed currentId={product.id} />
      </div>
    </div>
  );
}
