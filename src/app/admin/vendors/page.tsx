"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/use-auth";
import { useKyc, type KycStatus } from "@/src/hooks/use-kyc";

const label: Record<KycStatus, string> = {
  not_submitted: "Not submitted",
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
};

export default function AdminVendorsPage() {
  const users = useAuth((s) => s.users);
  const { records, approve, reject } = useKyc();
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const vendors = users.filter((u) => u.role === "vendor");

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Vendors
      </h1>
      <p className="mt-3 text-black/60">
        Review KYC submissions. Only approved vendors can list products.
      </p>

      {vendors.length === 0 ? (
        <p className="mt-10 text-black/60">No vendors have signed up yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {vendors.map((v) => {
            const k = records.find((r) => r.vendorId === v.id);
            const status: KycStatus = k?.status ?? "not_submitted";
            return (
              <article key={v.id} className="rounded-[20px] border border-black/10 p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{v.storeName ?? v.name}</p>
                    <p className="mt-1 text-sm text-black/60">
                      {v.name} · {v.email}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {label[status]}
                  </span>
                </div>

                {k && (
                  <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    <div><dt className="text-black/40">Legal name</dt><dd>{k.businessName}</dd></div>
                    <div><dt className="text-black/40">Seller type</dt><dd className="capitalize">{k.businessType.replace("_", " ")}</dd></div>
                    <div><dt className="text-black/40">Phone</dt><dd>{k.phone}</dd></div>
                    <div><dt className="text-black/40">Address</dt><dd>{k.address}, {k.country}</dd></div>
                    <div><dt className="text-black/40">ID</dt><dd className="capitalize">{k.idType.replace("_", " ")} ending {k.idLast4}</dd></div>
                    <div><dt className="text-black/40">Files</dt><dd>{k.idDocumentName}, {k.selfieName}</dd></div>
                  </dl>
                )}

                {status === "rejected" && k?.rejectionReason && (
                  <p className="mt-3 text-sm text-discount">Reason: {k.rejectionReason}</p>
                )}

                {status === "pending" && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => approve(v.id)}
                      className="inline-flex h-11 items-center rounded-full bg-black px-6 text-sm font-medium text-white"
                    >
                      Approve
                    </button>
                    <input
                      value={reasons[v.id] ?? ""}
                      onChange={(e) => setReasons((r) => ({ ...r, [v.id]: e.target.value }))}
                      placeholder="Reason for rejection"
                      className="h-11 min-w-0 flex-1 rounded-full bg-muted px-5 text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => reject(v.id, reasons[v.id] ?? "")}
                      className="inline-flex h-11 items-center rounded-full border border-black/10 px-6 text-sm font-medium text-discount"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
