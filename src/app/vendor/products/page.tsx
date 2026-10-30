"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/src/hooks/use-auth";
import { useCatalog } from "@/src/hooks/use-catalog";
import { useKycStatus } from "@/src/hooks/use-kyc";

export default function VendorProductsPage() {
  const user = useAuth((s) => s.user);
  const { items, remove } = useCatalog();
  const mine = items.filter((p) => p.vendorId === user?.id);
  const { status } = useKycStatus(user?.id);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
            My Products
          </h1>
          <p className="mt-3 text-black/60">{mine.length} listed in your store</p>
        </div>
        <Link
          href={status === "approved" ? "/vendor/products/new" : "/seller-kyc"}
          className="inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
        >
          {status === "approved" ? "Add product" : "Verify to add products"}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10">
        {mine.length === 0 ? (
          <p className="p-8 text-black/60">You haven&apos;t listed any products yet.</p>
        ) : (
          <ul className="divide-y divide-black/10">
            {mine.map((p) => (
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
                    href={`/products/${p.id}`}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium"
                  >
                    View
                  </Link>
                  <Link
                    href={`/vendor/products/${p.id}`}
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
        )}
      </div>
    </div>
  );
}
