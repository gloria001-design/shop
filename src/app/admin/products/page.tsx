"use client";

import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/src/hooks/use-catalog";

export default function AdminProductsPage() {
  const { items, remove } = useCatalog();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
            Products
          </h1>
          <p className="mt-3 text-black/60">{items.length} items in the catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
        >
          Add product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10">
        <ul className="divide-y divide-black/10">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-20">
                <Image src={p.image} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{p.name}</p>
                <p className="mt-1 text-sm text-black/60">
                  ${p.price} · {p.type} · {p.style}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove ${p.name}?`)) remove(p.id);
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-discount"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
