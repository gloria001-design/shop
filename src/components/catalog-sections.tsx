"use client";

import { useCatalog } from "@/src/hooks/use-catalog";
import { ProductSection } from "@/src/components/product-section";

export function CatalogSections() {
  const items = useCatalog((s) => s.items);
  const newArrivals = items.filter((p) => p.isNew).slice(0, 4);
  const topSelling = items.filter((p) => p.isTopSelling).slice(0, 4);

  return (
    <>
      <ProductSection title="New Arrivals" items={newArrivals} href="/products?new=1" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-black/10" />
      </div>
      <ProductSection title="Top Selling" items={topSelling} href="/products" />
    </>
  );
}
