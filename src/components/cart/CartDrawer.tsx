"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatPrice } from "@/lib/format";

/**
 * Mini-cart slide-in drawer. Opens from the header cart button and after
 * adding an item, giving instant premium feedback without a page navigation.
 */
export function CartDrawer() {
  const { t, locale } = useLocale();
  const { items, subtotal, setQuantity, remove, isDrawerOpen, closeDrawer } =
    useCart();
  const pathname = usePathname();

  // Close on route change + lock scroll while open.
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-emerald-deep/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-line bg-surface"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="text-[11px] uppercase tracking-label text-muted">
                {t("cart.miniTitle")}
                {items.length ? ` — ${items.length}` : ""}
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label={t("nav.close")}
                className="text-muted transition-colors hover:text-gold"
              >
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <ShoppingBag size={34} strokeWidth={1} className="text-gold/40" />
                <p className="text-[14px] text-muted">{t("cart.emptyHint")}</p>
                <Button href="/catalog" variant="gold-outline" onClick={closeDrawer}>
                  {t("cart.browse")}
                </Button>
              </div>
            ) : (
              <>
                {/* Items */}
                <ul className="flex-1 overflow-y-auto px-6">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 border-b border-line py-5"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-surface-2"
                      >
                        <SafeImage
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[10px] uppercase tracking-label text-muted">
                          {product.brand}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          className="mt-0.5 text-[14px] text-ink transition-colors hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <span className="nums mt-1 text-[12px] text-muted">
                          {formatPrice(product.priceUzs, locale)}
                        </span>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-gold"
                              aria-label="−"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="nums w-8 text-center text-[13px] text-ink">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-gold"
                              aria-label="+"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            aria-label={t("cart.remove")}
                            className="text-muted transition-colors hover:text-gold"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-label text-muted">
                      {t("cart.subtotal")}
                    </span>
                    <span className="nums font-serif text-xl text-emerald">
                      {formatPrice(subtotal, locale)}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button
                      href="/checkout"
                      variant="gold-solid"
                      size="lg"
                      className="w-full"
                      onClick={closeDrawer}
                    >
                      {t("cart.checkout")}
                    </Button>
                    <Button
                      href="/cart"
                      variant="ghost"
                      className="w-full"
                      onClick={closeDrawer}
                    >
                      {t("cart.view")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
