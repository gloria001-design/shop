"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useCatalog } from "@/src/hooks/use-catalog";
import { useOrders } from "@/src/hooks/use-orders";

export default function AdminCustomersPage() {
  const users = useAuth((s) => s.users);
  const orders = useOrders((s) => s.orders);
  const customers = users.filter((u) => u.role === "user");
  const vendors = users.filter((u) => u.role === "vendor");
  const products = useCatalog((s) => s.items);

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Customers
      </h1>
      <p className="mt-3 text-black/60">{customers.length} shoppers</p>

      <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10">
        {customers.length === 0 ? (
          <p className="p-8 text-black/60">No customer accounts yet.</p>
        ) : (
          <ul className="divide-y divide-black/10">
            {customers.map((user) => {
              const count = orders.filter((o) => o.userId === user.id).length;
              return (
                <li key={user.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-black/60">{user.email}</p>
                  </div>
                  <p className="text-sm text-black/60">
                    {count} order{count === 1 ? "" : "s"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h2 className="mt-12 text-2xl font-bold">Vendors</h2>
      <p className="mt-2 text-black/60">{vendors.length} registered</p>
      <div className="mt-6 overflow-hidden rounded-[20px] border border-black/10">
        {vendors.length === 0 ? (
          <p className="p-8 text-black/60">No vendors have signed up yet.</p>
        ) : (
          <ul className="divide-y divide-black/10">
            {vendors.map((v) => {
              const count = products.filter((p) => p.vendorId === v.id).length;
              return (
                <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="font-bold">{v.storeName ?? v.name}</p>
                    <p className="text-sm text-black/60">
                      {v.name} · {v.email}
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    {count} product{count === 1 ? "" : "s"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
