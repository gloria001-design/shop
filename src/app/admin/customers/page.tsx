"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useOrders } from "@/src/hooks/use-orders";

export default function AdminCustomersPage() {
  const users = useAuth((s) => s.users);
  const orders = useOrders((s) => s.orders);
  const customers = users.filter((u) => u.role !== "admin");

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
    </div>
  );
}
