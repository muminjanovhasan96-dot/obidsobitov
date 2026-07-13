import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse the OBID SOBITOV collection — luxury watches, designer clothing, bags and accessories in Tashkent.",
};

export default function CatalogPage() {
  // CatalogView reads ?category= via useSearchParams, so it needs a Suspense
  // boundary for static generation.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CatalogView />
    </Suspense>
  );
}
