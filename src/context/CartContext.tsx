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
import { type Product } from "@/data/products";
import { useProducts } from "./ProductsContext";

const STORAGE_KEY = "obid-cart";

/** A stored cart line — we persist only id + quantity, then join to products. */
type CartLine = { id: string; quantity: number };

/** A resolved line with the full product attached (for rendering). */
export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  isReady: boolean;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  // Mini-cart drawer UI state
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts();
  const [lines, setLines] = useState<CartLine[]>([]);
  // `isReady` flips true after we hydrate from localStorage — lets the UI avoid
  // rendering a stale (empty) badge before hydration completes.
  const [isReady, setIsReady] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Hydrate once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          // Keep well-formed lines; unresolvable ids are dropped when joining.
          setLines(
            parsed.filter(
              (l) =>
                l && typeof l.id === "string" && typeof l.quantity === "number",
            ),
          );
        }
      }
    } catch {
      /* corrupt storage — start empty */
    }
    setIsReady(true);
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [lines, isReady]);

  const add = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === productId);
      if (existing) {
        return prev.map((l) =>
          l.id === productId ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== productId)
        : prev.map((l) => (l.id === productId ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Join stored lines to full product objects for rendering.
  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { product, quantity: line.quantity } : null;
      })
      .filter((x): x is CartItem => x !== null);
  }, [lines, products]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceUzs * i.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      items,
      count,
      subtotal,
      isReady,
      add,
      remove,
      setQuantity,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [
      lines,
      items,
      count,
      subtotal,
      isReady,
      add,
      remove,
      setQuantity,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
