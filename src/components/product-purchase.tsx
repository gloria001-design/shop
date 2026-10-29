"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/src/types/product";
import { discountPercent } from "@/src/lib/products";
import { Stars } from "@/src/components/stars";
import { useCart } from "@/src/hooks/use-cart";

export function ProductPurchase({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(
    product.sizes.includes("Large") ? "Large" : product.sizes[0],
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product);

  function handleAdd() {
    add(product, { quantity: qty, color, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex gap-3 sm:w-[152px] sm:flex-col">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`relative h-[100px] flex-1 overflow-hidden rounded-[20px] bg-muted sm:h-[167px] sm:flex-none ${
                activeImage === i ? "ring-2 ring-black" : ""
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="152px" />
            </button>
          ))}
        </div>
        <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[20px] bg-muted sm:min-h-[530px]">
          <Image
            src={product.images[activeImage] ?? product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div>
        <h1 className="font-integral text-[28px] leading-tight uppercase sm:text-[40px]">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-sm">
            {product.rating}/<span className="text-black/40">5</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="text-[24px] font-bold sm:text-[32px]">${product.price}</span>
          {product.originalPrice != null && (
            <>
              <span className="text-[24px] font-bold text-black/40 line-through sm:text-[32px]">
                ${product.originalPrice}
              </span>
              <span className="rounded-full bg-discount/10 px-3.5 py-1.5 text-sm font-medium text-discount">
                -{discount}%
              </span>
            </>
          )}
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base">
          {product.description}
        </p>

        <hr className="my-6 border-black/10" />

        <p className="text-sm text-black/60 sm:text-base">Select Colors</p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => setColor(c.name)}
              className="relative size-9 rounded-full sm:size-10"
              style={{ backgroundColor: c.hex }}
            >
              {color === c.name && (
                <Check className="absolute inset-0 m-auto size-4 text-white" />
              )}
            </button>
          ))}
        </div>

        <hr className="my-6 border-black/10" />

        <p className="text-sm text-black/60 sm:text-base">Choose Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded-full px-5 py-2.5 text-sm sm:px-6 sm:text-base ${
                size === s ? "bg-black text-white" : "bg-muted text-black/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <hr className="my-6 border-black/10" />

        <div className="flex gap-3">
          <div className="flex h-[44px] w-[110px] items-center justify-between rounded-full bg-muted px-4 sm:h-[52px] sm:w-[170px] sm:px-5">
            <button
              type="button"
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Minus className="size-4 sm:size-5" />
            </button>
            <span className="font-medium">{qty}</span>
            <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
              <Plus className="size-4 sm:size-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="h-[44px] flex-1 rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85 sm:h-[52px] sm:text-base"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
