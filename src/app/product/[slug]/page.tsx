import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProductBySlug, products } from "@/data/products";
import { site } from "@/config/site";

type Params = { params: { slug: string } };

/** Pre-render a static page for every product at build time. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.brand} ${product.name}`,
    description: product.description.en,
    openGraph: {
      title: `${product.brand} ${product.name} · OBID SOBITOV`,
      description: product.description.en,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  // Product structured data (rich results in Google / social).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description.en,
    image: product.images,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "UZS",
      price: product.priceUzs,
      availability:
        product.availability === "onOrder"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
      url: `${site.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductView product={product} />
    </>
  );
}
