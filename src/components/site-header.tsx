"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ChevronDown, LayoutDashboard, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/src/hooks/use-cart";
import { useAuth } from "@/src/hooks/use-auth";

const links = [
  { href: "/products", label: "Shop", hasMenu: true },
  { href: "/products?sale=1", label: "On Sale" },
  { href: "/products?new=1", label: "New Arrivals" },
  { href: "/#brands", label: "Brands" },
];

export function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const user = useAuth((s) => s.user);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:h-[94px] lg:px-8">
        <button
          type="button"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-6" />
        </button>

        <Link href="/" className="font-integral shrink-0 text-[25px] leading-none sm:text-[32px]">
          SHOP.CO
        </Link>

        <nav className="hidden items-center gap-6 text-base lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
            >
              {l.label}
              {l.hasMenu && <ChevronDown className="size-4" />}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden min-w-0 flex-1 md:block lg:max-w-[577px]"
        >
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="h-12 w-full rounded-full bg-muted pl-12 pr-4 text-sm outline-none placeholder:text-black/40"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-3.5 md:ml-0">
          <button
            type="button"
            className="md:hidden"
            aria-label="Search"
            onClick={() => setMobileOpen(true)}
          >
            <Search className="size-5" />
          </button>
          <Link href="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="size-5 sm:size-6" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" aria-label="Admin dashboard">
              <LayoutDashboard className="size-5 sm:size-6" />
            </Link>
          )}
          <Link href={user ? "/account" : "/login"} aria-label="Account">
            <User className="size-5 sm:size-6" />
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="font-integral text-2xl"
              onClick={() => setMobileOpen(false)}
            >
              SHOP.CO
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X className="size-6" />
            </button>
          </div>
          <form onSubmit={onSearch} className="px-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="h-12 w-full rounded-full bg-muted pl-12 pr-4 text-sm outline-none"
              />
            </label>
          </form>
          <nav className="mt-6 flex flex-col gap-4 px-4 text-lg">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setMobileOpen(false)}
            >
              {user ? "My Account" : "Log In"}
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                Admin
              </Link>
            )}
            {!user && (
              <Link href="/signup" onClick={() => setMobileOpen(false)}>
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
