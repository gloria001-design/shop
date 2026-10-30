"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";
import { AuthLoading, useRequireAuth } from "@/src/components/require-auth";
import { useAuth } from "@/src/hooks/use-auth";

const nav = [
  { href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor/products", label: "My Products", icon: Package },
  { href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { href: "/seller-kyc", label: "Verification", icon: ShieldCheck },
];

export function VendorShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useRequireAuth("vendor");
  const logout = useAuth((s) => s.logout);

  if (!ready || !user) return <AuthLoading />;

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-black/10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between px-5 lg:h-[88px]">
          <Link href="/vendor" className="font-integral text-2xl">
            SHOP.CO
          </Link>
          <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-wider lg:hidden">
            Vendor
          </span>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-5">
          {nav.map((item) => {
            const active =
              item.href === "/vendor"
                ? pathname === "/vendor"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ${
                  active ? "bg-black text-white" : "text-black/60 hover:bg-muted"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-5 lg:block">
          <Link
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium"
          >
            <Store className="size-4" /> View store
          </Link>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-black/10 px-4 sm:px-6 lg:h-[88px] lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-black/40">Vendor</p>
            <p className="font-medium">{user.storeName ?? user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden h-10 items-center rounded-full border border-black/10 px-4 text-sm font-medium sm:inline-flex"
            >
              Store
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white"
            >
              <LogOut className="size-4" /> Log out
            </button>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
