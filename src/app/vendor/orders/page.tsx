"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useOrders } from "@/src/hooks/use-orders";
import {
  ordersForVendor,
  vendorLines,
  vendorSales,
  vendorStatus,
} from "@/src/lib/vendor-orders";
import type { OrderStatus } from "@/src/types/product";

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function VendorOrdersPage() {
  const user = useAuth((s) => s.user);
  const { orders: all, setFulfillment } = useOrders();
  if (!user) return null;

  const orders = ordersForVendor(all, user.id);

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Orders
      </h1>
      <p className="mt-3 text-black/60">{orders.length} containing your products</p>

      {orders.length === 0 ? (
        <p className="mt-10 text-black/60">No orders for your products yet.</p>
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
                <p className="text-xl font-bold">${vendorSales(order, user.id)}</p>
              </div>
              <p className="mt-3 text-sm text-black/60">
                Ship to: {order.address.fullName}, {order.address.line1},{" "}
                {order.address.city} {order.address.postal} · {order.address.phone}
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {vendorLines(order, user.id).map((item) => (
                  <li key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                    {item.name} × {item.quantity} ({item.selectedSize}, {item.selectedColor})
                  </li>
                ))}
              </ul>
              <label className="mt-4 block max-w-xs text-sm">
                <span className="mb-2 block font-medium">Your fulfilment status</span>
                <select
                  value={vendorStatus(order, user.id)}
                  onChange={(e) =>
                    setFulfillment(order.id, user.id, e.target.value as OrderStatus)
                  }
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
