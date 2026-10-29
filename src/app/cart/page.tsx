"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useCart } from "@/src/hooks/use-cart";
import { SectionHeading } from "@/src/components/section-heading";

export default function CartPage() {
  const { items, setQuantity, remove, total } = useCart();
  const subtotal = total();
  const discount = Math.round(subtotal * 0.2);
  const delivery = items.length ? 15 : 0;
  const grand = Math.max(0, subtotal - discount + delivery);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 border-t border-black/10 py-5 text-sm text-black/60"
      >
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-black">Cart</span>
      </nav>

      <SectionHeading>Your cart</SectionHeading>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-black/60">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 pb-16 lg:grid-cols-[1fr_400px]">
          <div className="rounded-[20px] border border-black/10 p-4 sm:p-6">
            {items.map((item, i) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className={`flex gap-3 py-4 sm:gap-4 ${
                  i > 0 ? "border-t border-black/10" : "pt-0"
                }`}
              >
                <div className="relative size-[99px] shrink-0 overflow-hidden rounded-xl bg-muted sm:size-[124px]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-base font-bold sm:text-xl">{item.name}</h3>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() =>
                        remove(item.id, item.selectedColor, item.selectedSize)
                      }
                      className="text-discount"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm">
                    Size: <span className="text-black/60">{item.selectedSize}</span>
                  </p>
                  <p className="text-xs sm:text-sm">
                    Color: <span className="text-black/60">{item.selectedColor}</span>
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <span className="text-xl font-bold">${item.price}</span>
                    <div className="flex h-8 items-center gap-4 rounded-full bg-muted px-3 sm:h-10 sm:px-4">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() =>
                          setQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity - 1,
                          )
                        }
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() =>
                          setQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity + 1,
                          )
                        }
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[20px] border border-black/10 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">Order Summary</h2>
            <dl className="mt-5 space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <dt className="text-black/60">Subtotal</dt>
                <dd className="font-bold">${subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Discount (-20%)</dt>
                <dd className="font-bold text-discount">-${discount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Delivery Fee</dt>
                <dd className="font-bold">${delivery}</dd>
              </div>
              <div className="flex justify-between border-t border-black/10 pt-4 text-lg sm:text-xl">
                <dt>Total</dt>
                <dd className="font-bold">${grand}</dd>
              </div>
            </dl>
            <form
              className="mt-5 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label className="relative block flex-1">
                <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/40" />
                <input
                  placeholder="Add promo code"
                  className="h-12 w-full rounded-full bg-muted pl-10 pr-4 text-sm outline-none"
                />
              </label>
              <button
                type="submit"
                className="h-12 rounded-full bg-black px-6 text-sm font-medium text-white"
              >
                Apply
              </button>
            </form>
            <button
              type="button"
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white"
            >
              Go to Checkout <ChevronRight className="size-4" />
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
