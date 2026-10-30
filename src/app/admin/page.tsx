"use client";

import Link from "next/link";
import { Package, ShoppingBag, Users } from "lucide-react";
import { useAuth } from "@/src/hooks/use-auth";
import { useCatalog } from "@/src/hooks/use-catalog";
import { useOrders } from "@/src/hooks/use-orders";

export default function AdminDashboardPage() {
  const products = useCatalog((s) => s.items);
  const orders = useOrders((s) => s.orders);
  const users = useAuth((s) => s.users);
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  const stats = [
    { label: "Products", value: products.length, href: "/admin/products", icon: Package },
    { label: "Orders", value: orders.length, href: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", value: users.filter((u) => u.role !== "admin").length, href: "/admin/customers", icon: Users },
  ];

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Dashboard
      </h1>
      <p className="mt-3 text-black/60">Overview of your SHOP.CO store.</p>

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

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[20px] border border-black/10 p-6">
          <p className="text-sm text-black/60">Revenue (non-cancelled)</p>
          <p className="mt-3 text-3xl font-bold">${revenue}</p>
        </div>
        <div className="rounded-[20px] border border-black/10 p-6">
          <p className="text-sm text-black/60">Pending orders</p>
          <p className="mt-3 text-3xl font-bold">{pending}</p>
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-black/10 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm underline underline-offset-2">
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-6 text-black/60">No orders yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-black/10">
            {orders.slice(0, 6).map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-black/60">{order.userName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total}</p>
                  <p className="text-sm capitalize text-black/60">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
