"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeading } from "@/src/components/section-heading";
import { AuthLoading, useRequireAuth } from "@/src/components/require-auth";
import { useAuth } from "@/src/hooks/use-auth";
import { useOrders } from "@/src/hooks/use-orders";
import type { OrderStatus } from "@/src/types/product";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, ready } = useRequireAuth();
  const logout = useAuth((s) => s.logout);
  const orders = useOrders((s) => s.orders);
  const mine = user ? orders.filter((o) => o.userId === user.id) : [];

  if (!ready || !user) return <AuthLoading />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading>My account</SectionHeading>
      <div className="mt-8 grid gap-5 lg:grid-cols-[340px_1fr]">
        <div className="h-fit rounded-[20px] border border-black/10 p-6 sm:p-8">
          <p className="text-sm text-black/60">Signed in as</p>
          <p className="mt-1 text-xl font-bold">{user.name}</p>
          <p className="mt-1 text-black/60">{user.email}</p>
          <p className="mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide">
            {user.role}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white"
            >
              Continue shopping
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium"
              >
                Open admin
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="rounded-[20px] border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Order history</h2>
          {mine.length === 0 ? (
            <p className="mt-6 text-black/60">
              You haven&apos;t placed an order yet.{" "}
              <Link href="/products" className="underline underline-offset-2">
                Start shopping
              </Link>
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-black/10">
              {mine.map((order) => (
                <li key={order.id} className="py-5 first:pt-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{order.id}</p>
                      <p className="mt-1 text-sm text-black/60">
                        {new Date(order.createdAt).toLocaleDateString()} · {order.items.length}{" "}
                        item{order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {order.items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted"
                      >
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-bold">${order.total}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
