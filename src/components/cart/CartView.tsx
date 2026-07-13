"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { t, locale } = useLocale();
  const { items, subtotal, setQuantity, remove, isReady } = useCart();

  // Empty (and also shown briefly before hydration completes if truly empty).
  if (isReady && items.length === 0) {
    return (
      <>
        <PageIntro title={t("cart.title")} />
        <div className="mx-auto flex max-w-shell flex-col items-center px-6 py-28 text-center">
          <ShoppingBag size={40} strokeWidth={1} className="text-gold/50" />
          <h2 className="mt-6 font-serif text-2xl text-ink">
            {t("cart.empty")}
          </h2>
          <p className="mt-3 max-w-sm text-[14px] text-muted">
            {t("cart.emptyHint")}
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
      <PageIntro title={t("cart.title")} />

      <div className="mx-auto max-w-shell px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Line items */}
          <div>
            <div className="hidden grid-cols-[1fr_auto_auto] gap-6 border-b border-line pb-4 text-[11px] uppercase tracking-label text-muted sm:grid">
              <span>{t("cart.item")}</span>
              <span className="w-32 text-center">{t("cart.quantity")}</span>
              <span className="w-32 text-right">{t("cart.lineTotal")}</span>
            </div>

            <ul>
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex flex-col gap-4 border-b border-line py-6 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"
                >
                  {/* Product */}
                  <div className="flex gap-4">
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative aspect-square w-20 shrink-0 overflow-hidden bg-surface sm:w-24"
                    >
                      <SafeImage
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <span className="text-[11px] uppercase tracking-label text-muted">
                        {product.brand}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="mt-1 block text-[15px] text-ink transition-colors hover:text-gold"
                      >
                        {product.name}
                      </Link>
                      <span className="mt-1 block text-[13px] text-muted">
                        {formatPrice(product.priceUzs, locale)}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-gold sm:hidden"
                      >
                        <X size={12} /> {t("cart.remove")}
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center sm:w-32 sm:justify-center">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.id, quantity - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
                        aria-label="−"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-[13px] text-ink">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.id, quantity + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
                        aria-label="+"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Line total + remove (desktop) */}
                  <div className="flex items-center justify-between sm:w-32 sm:justify-end sm:gap-3">
                    <span className="text-[14px] text-ink">
                      {formatPrice(product.priceUzs * quantity, locale)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="hidden text-muted transition-colors hover:text-gold sm:block"
                      aria-label={t("cart.remove")}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/catalog"
                className="text-[11px] uppercase tracking-label text-muted transition-colors hover:text-gold"
              >
                ← {t("actions.continueShopping")}
              </Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:pl-4">
            <div className="border border-line bg-surface/40 p-7">
              <h2 className="font-serif text-xl text-ink">
                {t("cart.summary")}
              </h2>
              <dl className="mt-6 space-y-4 text-[14px]">
                <div className="flex justify-between text-muted">
                  <dt>{t("cart.subtotal")}</dt>
                  <dd className="text-ink">{formatPrice(subtotal, locale)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>{t("cart.delivery")}</dt>
                  <dd className="text-[12px]">{t("cart.deliveryValue")}</dd>
                </div>
                <div className="my-2 rule-gold" />
                <div className="flex justify-between text-base">
                  <dt className="text-ink">{t("cart.total")}</dt>
                  <dd className="font-serif text-lg text-emerald">
                    {formatPrice(subtotal, locale)}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                <Button
                  href="/checkout"
                  variant="gold-solid"
                  size="lg"
                  className="w-full"
                >
                  {t("cart.checkout")}
                </Button>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-muted/80">
                {t("cart.note")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
