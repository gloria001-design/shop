"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/src/types/product";
import { products as seedProducts } from "@/src/lib/products";

type CatalogState = {
  items: Product[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  getById: (id: string) => Product | undefined;
  upsert: (product: Product) => void;
  remove: (id: string) => void;
};

function slugify(name: string) {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || `item-${crypto.randomUUID().slice(0, 8)}`;
}

export function createProductId(name: string, existing: Product[]) {
  const base = slugify(name);
  if (!existing.some((p) => p.id === base)) return base;
  return `${base}-${crypto.randomUUID().slice(0, 6)}`;
}

export const useCatalog = create<CatalogState>()(
  persist(
    (set, get) => ({
      items: seedProducts,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      getById: (id) => get().items.find((p) => p.id === id),
      upsert: (product) =>
        set((state) => {
          const index = state.items.findIndex((p) => p.id === product.id);
          if (index === -1) return { items: [product, ...state.items] };
          const next = [...state.items];
          next[index] = product;
          return { items: next };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
    }),
    {
      name: "shopco-catalog",
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const stored = persisted as { items?: Product[] } | undefined;
        const items =
          stored?.items && stored.items.length > 0 ? stored.items : current.items;
        return { ...current, items };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
