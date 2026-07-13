"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useProducts } from "@/context/ProductsContext";
import { brandsOf } from "@/lib/catalog";

export function BrandMarquee() {
  const { products } = useProducts();
  const BRANDS = brandsOf(products);
  return (
    <div className="border-y border-line bg-base py-7">
      <Marquee speed="marquee-slow">
        {BRANDS.map((brand) => (
          <span key={brand} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-serif text-lg tracking-wide text-muted/70 transition-colors md:text-xl">
              {brand}
            </span>
            <span
              className="inline-block h-1 w-1 rotate-45 bg-gold/50"
              aria-hidden="true"
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
