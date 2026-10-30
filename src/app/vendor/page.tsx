"use client";

import Link from "next/link";
import { DollarSign, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/src/hooks/use-auth";
import { useCatalog } from "@/src/hooks/use-catalog";
import { useKycStatus } from "@/src/hooks/use-kyc";
import { useOrders } from "@/src/hooks/use-orders";
import {
  ordersForVendor,
  vendorSales,
  vendorStatus,
} from "@/src/lib/vendor-orders";

export default function VendorDashboardPage() {
  const user = useAuth((s) => s.user);
  const items = useCatalog((s) => s.items);
  const allOrders = useOrders((s) => s.orders);

  const { status: kyc, hydrated: kycReady } = useKycStatus(user?.id);

  if (!user) return null;

  const products = items.filter((p) => p.vendorId === user.id);
  const orders = ordersForVendor(allOrders, user.id);
  const live = orders.filter((o) => vendorStatus(o, user.id) !== "cancelled");
  const sales = live.reduce((sum, o) => sum + vendorSales(o, user.id), 0);
  const toFulfil = orders.filter(
    (o) => vendorStatus(o, user.id) === "pending",
  ).length;

  const stats = [
    { label: "My products", value: products.length, href: "/vendor/products", icon: Package },
    { label: "Orders", value: orders.length, href: "/vendor/orders", icon: ShoppingBag },
    { label: "Sales", value: `$${sales}`, href: "/vendor/orders", icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Dashboard
      </h1>
      <p className="mt-3 text-black/60">
        Welcome back, {user.storeName ?? user.name}.
      </p>

      {kycReady && kyc !== "approved" && (
        <div className="mt-6 rounded-[20px] bg-muted p-5">
          <p className="font-bold">
            {kyc === "pending"
              ? "KYC under review"
              : kyc === "rejected"
                ? "KYC rejected"
                : "Complete your KYC to start selling"}
          </p>
          <p className="mt-1 text-sm text-black/60">
            You can&apos;t list products until an admin approves your verification.
          </p>
          <Link
            href="/seller-kyc"
            className="mt-3 inline-flex h-10 items-center rounded-full bg-black px-5 text-sm font-medium text-white"
          >
            {kyc === "pending" ? "View status" : "Go to KYC"}
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-[20px] border border-black/10 p-6 transition hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-black/60">{s.label}</p>
                <Icon className="size-5 text-black/40" />
              </div>
              <p className="mt-4 text-3xl font-bold">{s.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-[20px] border border-black/10 p-6">
        <p className="text-sm text-black/60">Orders waiting to be processed</p>
        <p className="mt-3 text-3xl font-bold">{toFulfil}</p>
      </div>

      {products.length === 0 && kyc === "approved" && (
        <div className="mt-8 rounded-[20px] bg-muted p-6">
          <p className="font-bold">List your first product</p>
          <p className="mt-1 text-sm text-black/60">
            Your products appear in the SHOP.CO store as soon as you save them.
          </p>
          <Link
            href="/vendor/products/new"
            className="mt-4 inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
          >
            Add product
          </Link>
        </div>
      )}

      <div className="mt-8 rounded-[20px] border border-black/10 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Recent orders</h2>
          <Link href="/vendor/orders" className="text-sm underline underline-offset-2">
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-6 text-black/60">No orders for your products yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-black/10">
            {orders.slice(0, 6).map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-black/60">{order.userName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${vendorSales(order, user.id)}</p>
                  <p className="text-sm capitalize text-black/60">
                    {vendorStatus(order, user.id)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
