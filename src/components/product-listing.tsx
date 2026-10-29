"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { products } from "@/src/lib/products";
import { ProductCard } from "@/src/components/product-card";
import type { DressStyle, ProductType } from "@/src/types/product";

const types: ProductType[] = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const styles: DressStyle[] = ["Casual", "Formal", "Party", "Gym"];
const colors = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Cyan", hex: "#06CAF5" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
];
const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const PAGE_SIZE = 9;

type Props = {
  initialStyle?: string;
  initialQuery?: string;
  initialSale?: boolean;
  initialNew?: boolean;
};

export function ProductListing({
  initialStyle,
  initialQuery,
  initialSale,
  initialNew,
}: Props) {
  const [type, setType] = useState<ProductType | "">("");
  const [style, setStyle] = useState<DressStyle | "">(
    (initialStyle as DressStyle) || "",
  );
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(300);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (initialQuery) {
      const q = initialQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (initialSale) list = list.filter((p) => p.originalPrice != null);
    if (initialNew) list = list.filter((p) => p.isNew);
    if (type) list = list.filter((p) => p.type === type);
    if (style) list = list.filter((p) => p.style === style);
    if (color) list = list.filter((p) => p.colors.some((c) => c.name === color));
    if (size) {
      list = list.filter((p) =>
        p.sizes.some((s) => s.toLowerCase() === size.toLowerCase()),
      );
    }
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "popular") list.sort((a, b) => b.reviewsCount - a.reviewsCount);

    return list;
  }, [type, style, color, size, priceMin, priceMax, sort, initialQuery, initialSale, initialNew]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const title = style || (initialSale ? "On Sale" : initialNew ? "New Arrivals" : "Casual");

  const filters = (
    <div className="rounded-[20px] border border-black/10 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="size-5 text-black/40" />
      </div>

      <hr className="my-5 border-black/10" />

      <ul className="space-y-4">
        {types.map((t) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => {
                setType(type === t ? "" : t);
                setPage(1);
              }}
              className={`flex w-full items-center justify-between text-base ${
                type === t ? "font-medium text-black" : "text-black/60"
              }`}
            >
              {t}
              <ChevronRight className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      <hr className="my-5 border-black/10" />

      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xl font-bold">
          Price
          <ChevronDown className="size-4 transition group-open:rotate-180" />
        </summary>
        <div className="mt-5">
          <input
            type="range"
            min={0}
            max={300}
            value={priceMax}
            onChange={(e) => {
              setPriceMax(Number(e.target.value));
              setPage(1);
            }}
            className="w-full accent-black"
          />
          <div className="mt-2 flex justify-between text-sm font-medium">
            <span>${priceMin}</span>
            <span>${priceMax}</span>
          </div>
        </div>
      </details>

      <hr className="my-5 border-black/10" />

      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xl font-bold">
          Colors
          <ChevronDown className="size-4 transition group-open:rotate-180" />
        </summary>
        <div className="mt-5 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => {
                setColor(color === c.name ? "" : c.name);
                setPage(1);
              }}
              className="relative size-9 rounded-full border border-black/20"
              style={{ backgroundColor: c.hex }}
            >
              {color === c.name && (
                <Check
                  className={`absolute inset-0 m-auto size-4 ${
                    c.name === "White" || c.name === "Yellow" ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </details>

      <hr className="my-5 border-black/10" />

      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xl font-bold">
          Size
          <ChevronDown className="size-4 transition group-open:rotate-180" />
        </summary>
        <div className="mt-5 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setPage(1);
              }}
              className={`rounded-full px-5 py-2.5 text-sm ${
                size === s
                  ? "bg-black text-white"
                  : "bg-muted text-black/60 hover:bg-black/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </details>

      <hr className="my-5 border-black/10" />

      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xl font-bold">
          Dress Style
          <ChevronDown className="size-4 transition group-open:rotate-180" />
        </summary>
        <ul className="mt-5 space-y-4">
          {styles.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => {
                  setStyle(style === s ? "" : s);
                  setPage(1);
                }}
                className={`flex w-full items-center justify-between text-base ${
                  style === s ? "font-medium text-black" : "text-black/60"
                }`}
              >
                {s}
                <ChevronRight className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </details>

      <button
        type="button"
        onClick={() => setFiltersOpen(false)}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white"
      >
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 border-t border-black/10 py-5 text-sm text-black/60"
      >
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-black">{title}</span>
      </nav>

      <div className="flex gap-5 pb-16">
        <aside className="hidden w-[295px] shrink-0 lg:block">{filters}</aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-[32px] font-bold">{title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-black/60">
              <span>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}-
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
                Products
              </span>
              <label className="inline-flex items-center gap-1">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent font-medium text-black outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low-High</option>
                  <option value="price-desc">Price: High-Low</option>
                </select>
              </label>
              <button
                type="button"
                className="rounded-full bg-muted p-2 lg:hidden"
                aria-label="Open filters"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal className="size-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {pageItems.length === 0 && (
            <p className="py-20 text-center text-black/60">No products match these filters.</p>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <div className="hidden items-center gap-1 sm:flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`size-9 rounded-lg text-sm ${
                    n === currentPage ? "bg-muted font-medium" : "text-black/50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm disabled:opacity-40"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-4 lg:hidden">
          <div className="mb-3 flex justify-end">
            <button type="button" aria-label="Close" onClick={() => setFiltersOpen(false)}>
              <X className="size-6" />
            </button>
          </div>
          {filters}
        </div>
      )}
    </div>
  );
}
