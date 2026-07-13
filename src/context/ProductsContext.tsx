"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as defaultProducts, type Product } from "@/data/products";

const STORAGE_KEY = "obid-products";

type ProductsContextValue = {
  /** Live product list — admin edits overlaid on the built-in defaults. */
  products: Product[];
  isReady: boolean;
  /** Admin: replace the whole catalog (persisted to localStorage). */
  saveAll: (list: Product[]) => void;
  /** Admin: restore the built-in default catalog. */
  reset: () => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  // Start from defaults (matches SSR), then overlay admin edits after mount.
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed) && parsed.length) setProducts(parsed);
      }
    } catch {
      /* corrupt storage — keep defaults */
    }
    setIsReady(true);
  }, []);

  const saveAll = useCallback((list: Product[]) => {
    setProducts(list);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore quota errors */
    }
  }, []);

  const reset = useCallback(() => {
    setProducts(defaultProducts);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ProductsContextValue>(
    () => ({ products, isReady, saveAll, reset }),
    [products, isReady, saveAll, reset],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
