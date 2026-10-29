"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionHeading } from "@/src/components/section-heading";
import { useAuth } from "@/src/hooks/use-auth";

export default function AccountPage() {
  const router = useRouter();
  const { user, hydrated, logout } = useAuth();

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center text-black/60 sm:px-6 lg:px-8">
        Loading…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading>My account</SectionHeading>
      <div className="mt-8 max-w-lg rounded-[20px] border border-black/10 p-6 sm:p-8">
        <p className="text-sm text-black/60">Signed in as</p>
        <p className="mt-1 text-xl font-bold">{user.name}</p>
        <p className="mt-1 text-black/60">{user.email}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
          >
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="inline-flex h-12 items-center rounded-full border border-black/10 px-6 text-sm font-medium"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
