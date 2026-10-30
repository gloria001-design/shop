"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductPurchase } from "@/src/components/product-purchase";
import { ProductTabs } from "@/src/components/product-tabs";
import { ProductCard } from "@/src/components/product-card";
import { SectionHeading } from "@/src/components/section-heading";
import { useCatalog } from "@/src/hooks/use-catalog";

export function ProductDetail({ id }: { id: string }) {
  const { items, hydrated, getById } = useCatalog();
  const product = getById(id);

  if (!hydrated && !product) {
    return (
      <div className="py-20 text-center text-black/60">Loading product…</div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-black/60">This product is no longer available.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const related = items.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 border-t border-black/10 py-5 text-sm text-black/60"
      >
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href="/products" className="hover:text-black">
          Shop
        </Link>
        <ChevronRight className="size-4" />
        <Link href={`/products?style=${product.style}`} className="hover:text-black">
          {product.style}
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-black">{product.type}</span>
      </nav>

      <p className="mb-4 text-sm text-black/60">
        Sold by{" "}
        <span className="font-medium text-black">
          {product.vendorName ?? "SHOP.CO"}
        </span>
      </p>

      <ProductPurchase product={product} />
      <ProductTabs product={product} />

      <section className="mt-14 sm:mt-20">
        <SectionHeading className="text-center">You might also like</SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
