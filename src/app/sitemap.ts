import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticRoutes = ["", "/catalog", "/concierge", "/about", "/wishlist"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
