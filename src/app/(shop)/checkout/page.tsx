"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { AuthField } from "@/src/components/auth-shell";
import { AuthLoading, useRequireAuth } from "@/src/components/require-auth";
import { SectionHeading } from "@/src/components/section-heading";
import { useCart } from "@/src/hooks/use-cart";
import { useOrders } from "@/src/hooks/use-orders";
import type { OrderAddress } from "@/src/types/product";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, ready } = useRequireAuth();
  const { items, total, clear } = useCart();
  const place = useOrders((s) => s.place);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [address, setAddress] = useState<OrderAddress>({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    postal: "",
  });

  const subtotal = total();
  const discount = Math.round(subtotal * 0.2);
  const delivery = items.length ? 15 : 0;
  const grand = Math.max(0, subtotal - discount + delivery);

  useEffect(() => {
    if (user && !address.fullName) {
      setAddress((a) => ({ ...a, fullName: user.name }));
    }
  }, [user, address.fullName]);

  useEffect(() => {
    if (ready && items.length === 0) router.replace("/cart");
  }, [ready, items.length, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.line1.trim() ||
      !address.city.trim() ||
      !address.postal.trim()
    ) {
      setError("Please fill in your delivery details.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setPending(true);
    const order = place({
      userId: user.id,
      userName: user.name,
      email: user.email,
      items,
      subtotal,
      discount,
      delivery,
      total: grand,
      address,
      payment,
    });
    clear();
    router.push(`/checkout/success?order=${encodeURIComponent(order.id)}`);
  }

  if (!ready || !user) return <AuthLoading />;

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
        <Link href="/cart" className="hover:text-black">
          Cart
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-black">Checkout</span>
      </nav>

      <SectionHeading>Checkout</SectionHeading>

      <form onSubmit={onSubmit} className="mt-6 grid gap-5 pb-16 lg:grid-cols-[1fr_400px]">
        <div className="space-y-5">
          <section className="rounded-[20px] border border-black/10 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">Delivery details</h2>
            <div className="mt-5 space-y-4">
              <AuthField
                id="fullName"
                label="Full name"
                value={address.fullName}
                onChange={(v) => setAddress((a) => ({ ...a, fullName: v }))}
              />
              <AuthField
                id="phone"
                label="Phone"
                value={address.phone}
                onChange={(v) => setAddress((a) => ({ ...a, phone: v }))}
                placeholder="+1 555 000 0000"
              />
              <AuthField
                id="line1"
                label="Address"
                value={address.line1}
                onChange={(v) => setAddress((a) => ({ ...a, line1: v }))}
                placeholder="Street, apartment"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                  id="city"
                  label="City"
                  value={address.city}
                  onChange={(v) => setAddress((a) => ({ ...a, city: v }))}
                />
                <AuthField
                  id="postal"
                  label="Postal code"
                  value={address.postal}
                  onChange={(v) => setAddress((a) => ({ ...a, postal: v }))}
                />
              </div>
            </div>
          </section>

          <section className="rounded-[20px] border border-black/10 p-5 sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">Payment</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "cod", label: "Cash on delivery" },
                  { id: "card", label: "Card (demo)" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPayment(opt.id)}
                  className={`rounded-full px-5 py-3 text-sm font-medium ${
                    payment === opt.id
                      ? "bg-black text-white"
                      : "bg-muted text-black/60"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-black/50">
              This is a demo checkout — no real payment is processed.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-[20px] border border-black/10 p-5 sm:p-6">
          <h2 className="text-xl font-bold sm:text-2xl">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex justify-between gap-3"
              >
                <span className="text-black/60">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
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
          {error && (
            <p className="mt-4 rounded-2xl bg-discount/10 px-4 py-3 text-sm text-discount">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white disabled:opacity-60"
          >
            {pending ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </main>
  );
}
