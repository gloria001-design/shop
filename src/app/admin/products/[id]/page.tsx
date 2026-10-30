"use client";

import { use } from "react";
import Link from "next/link";
import { AdminProductForm } from "@/src/components/admin-product-form";
import { useCatalog } from "@/src/hooks/use-catalog";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = useCatalog((s) => s.getById(id));
  const hydrated = useCatalog((s) => s.hydrated);

  if (!hydrated && !product) {
    return <p className="text-black/60">Loading…</p>;
  }

  if (!product) {
    return (
      <div>
        <p className="text-black/60">Product not found.</p>
        <Link href="/admin/products" className="mt-4 inline-block underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Edit product
      </h1>
      <p className="mt-3 mb-8 text-black/60">{product.name}</p>
      <AdminProductForm product={product} />
    </div>
  );
}
