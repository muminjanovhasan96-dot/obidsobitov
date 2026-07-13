"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/context/LocaleContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProductsProvider } from "@/context/ProductsContext";

/**
 * Client-side providers — theme, language, product store, wishlist and cart.
 * ProductsProvider wraps the cart/wishlist so they resolve ids against the
 * live (admin-edited) catalog.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ProductsProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </ProductsProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
