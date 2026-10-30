"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SectionHeading } from "@/src/components/section-heading";

function SuccessBody() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order");

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-[20px] border border-black/10 p-8 text-center sm:p-12">
        <SectionHeading>Order placed</SectionHeading>
        <p className="mt-4 text-black/60">
          Thanks for shopping with SHOP.CO. We&apos;ll email updates as your order moves.
        </p>
        {order && (
          <p className="mt-4 rounded-full bg-muted px-4 py-2 text-sm font-medium">
            {order}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/account"
            className="inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
          >
            View orders
          </Link>
          <Link
            href="/products"
            className="inline-flex h-12 items-center rounded-full border border-black/10 px-6 text-sm font-medium"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="py-20 text-center text-black/60">Loading…</main>}>
      <SuccessBody />
    </Suspense>
  );
}
