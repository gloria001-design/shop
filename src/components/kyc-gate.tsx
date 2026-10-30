"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/src/hooks/use-auth";
import { useKycStatus } from "@/src/hooks/use-kyc";

/** Shows children only for KYC-approved vendors; otherwise explains what to do. */
export function KycGate({ children }: { children: React.ReactNode }) {
  const user = useAuth((s) => s.user);
  const { status, hydrated } = useKycStatus(user?.id);

  if (!hydrated) return <p className="text-black/60">Loading…</p>;
  if (status === "approved") return <>{children}</>;

  const copy = {
    not_submitted: "Verify your identity (KYC) before you can list products.",
    pending: "Your KYC is under review. You can list products once it's approved.",
    rejected: "Your KYC was rejected. Please review the reason and resubmit.",
  }[status];

  return (
    <div className="rounded-[20px] bg-muted p-6 sm:p-8">
      <ShieldCheck className="size-8" />
      <p className="mt-4 text-xl font-bold">Verification required</p>
      <p className="mt-2 text-black/60">{copy}</p>
      <Link
        href="/seller-kyc"
        className="mt-5 inline-flex h-12 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
      >
        {status === "pending" ? "View KYC status" : "Go to KYC"}
      </Link>
    </div>
  );
}
