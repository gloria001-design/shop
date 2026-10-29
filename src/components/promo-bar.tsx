"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function PromoBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-black px-10 py-2.5 text-center text-xs text-white sm:text-sm">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <Link href="/signup" className="underline underline-offset-2">
          Sign Up Now
        </Link>
      </p>
      <button
        type="button"
        aria-label="Dismiss promo"
        onClick={() => setOpen(false)}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
