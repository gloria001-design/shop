"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/src/types/product";

type CartState = {
  items: CartItem[];
  add: (
    product: Product,
    opts?: { quantity?: number; color?: string; size?: string },
  ) => void;
  remove: (id: string, color: string, size: string) => void;
  setQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number,
  ) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, opts) =>
        set((state) => {
          const selectedColor = opts?.color ?? product.colors[0]?.name ?? "";
          const selectedSize = opts?.size ?? product.sizes[2] ?? product.sizes[0];
          const quantity = opts?.quantity ?? 1;
          const existing = state.items.find(
            (i) =>
              i.id === product.id &&
              i.selectedColor === selectedColor &&
              i.selectedSize === selectedSize,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...product, quantity, selectedColor, selectedSize },
            ],
          };
        }),
      remove: (id, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.id === id &&
                i.selectedColor === color &&
                i.selectedSize === size
              ),
          ),
        })),
      setQuantity: (id, color, size, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) =>
                    !(
                      i.id === id &&
                      i.selectedColor === color &&
                      i.selectedSize === size
                    ),
                )
              : state.items.map((i) =>
                  i.id === id &&
                  i.selectedColor === color &&
                  i.selectedSize === size
                    ? { ...i, quantity }
                    : i,
                ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "shopco-cart" },
  ),
);
