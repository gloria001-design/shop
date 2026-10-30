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
