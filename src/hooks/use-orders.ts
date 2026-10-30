"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Order, OrderAddress, OrderStatus } from "@/src/types/product";

type PlaceOrderInput = {
  userId: string;
  userName: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  address: OrderAddress;
  payment: "cod" | "card";
};

type OrdersState = {
  orders: Order[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  place: (input: PlaceOrderInput) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
  setFulfillment: (id: string, vendorId: string, status: OrderStatus) => void;
  forUser: (userId: string) => Order[];
};

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      place: (input) => {
        const order: Order = {
          ...input,
          id: `ord-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 4)}`,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      setFulfillment: (id, vendorId, status) =>
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== id) return o;
            const fulfillment = { ...o.fulfillment, [vendorId]: status };
            const vendorIds = [
              ...new Set(o.items.map((i) => i.vendorId).filter(Boolean)),
            ] as string[];
            const states = vendorIds.map((v) => fulfillment[v] ?? "pending");
            const allVendorOwned = o.items.every((i) => i.vendorId);
            let overall = o.status;
            if (allVendorOwned && states.every((s) => s === states[0])) {
              overall = states[0];
            } else if (overall === "pending") {
              overall = "processing";
            }
            return { ...o, fulfillment, status: overall };
          }),
        })),
      forUser: (userId) => get().orders.filter((o) => o.userId === userId),
    }),
    {
      name: "shopco-orders",
      partialize: (state) => ({ orders: state.orders }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
