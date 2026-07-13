import type { Product, Category } from "@/data/products";

/** Pure catalog helpers that operate on whatever product list you pass in
 *  (the built-in defaults on the server, or the admin-edited list on the
 *  client via useProducts()). */

export function bySlug(list: Product[], slug: string): Product | undefined {
  return list.find((p) => p.slug === slug);
}

export function featuredWatches(list: Product[], limit = 6): Product[] {
  return list
    .filter((p) => p.category === "watches" && p.featured)
    .slice(0, limit);
}

export function relatedTo(
  list: Product[],
  product: Product,
  limit = 4,
): Product[] {
  return list
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function brandsOf(list: Product[], category?: Category): string[] {
  const pool = category ? list.filter((p) => p.category === category) : list;
  return Array.from(new Set(pool.map((p) => p.brand))).sort();
}

export function priceBoundsOf(list: Product[]): { min: number; max: number } {
  if (!list.length) return { min: 0, max: 0 };
  return {
    min: Math.min(...list.map((p) => p.priceUzs)),
    max: Math.max(...list.map((p) => p.priceUzs)),
  };
}
