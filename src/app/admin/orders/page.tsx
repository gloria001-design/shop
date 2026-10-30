"use client";

import { useOrders } from "@/src/hooks/use-orders";
import type { OrderStatus } from "@/src/types/product";

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const { orders, setStatus } = useOrders();

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Orders
      </h1>
      <p className="mt-3 text-black/60">{orders.length} total</p>

      {orders.length === 0 ? (
        <p className="mt-10 text-black/60">No customer orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-[20px] border border-black/10 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{order.id}</p>
                  <p className="mt-1 text-sm text-black/60">
                    {order.userName} · {order.email}
                  </p>
                  <p className="mt-1 text-sm text-black/60">
                    {new Date(order.createdAt).toLocaleString()} · {order.payment.toUpperCase()}
                  </p>
                </div>
                <p className="text-xl font-bold">${order.total}</p>
              </div>
              <p className="mt-3 text-sm text-black/60">
                {order.address.line1}, {order.address.city} {order.address.postal}
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {order.items.map((item) => (
                  <li key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                    {item.name} × {item.quantity} ({item.selectedSize}, {item.selectedColor})
                  </li>
                ))}
              </ul>
              <label className="mt-4 block max-w-xs text-sm">
                <span className="mb-2 block font-medium">Status</span>
                <select
                  value={order.status}
                  onChange={(e) => setStatus(order.id, e.target.value as OrderStatus)}
                  className="h-12 w-full rounded-full bg-muted px-5 text-sm outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
