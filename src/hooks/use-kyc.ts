"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type KycStatus = "not_submitted" | "pending" | "approved" | "rejected";

export type KycRecord = {
  vendorId: string;
  status: KycStatus;
  businessName: string;
  businessType: "individual" | "registered_business";
  phone: string;
  country: string;
  address: string;
  idType: "national_id" | "passport" | "drivers_license" | "business_reg";
  /** Only the last 4 characters are ever stored. */
  idLast4: string;
  /** File names only: this demo does not upload or store the documents. */
  idDocumentName: string;
  selfieName: string;
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
};

export type KycInput = Omit<
  KycRecord,
  "vendorId" | "status" | "submittedAt" | "reviewedAt" | "rejectionReason"
>;

type KycState = {
  records: KycRecord[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  forVendor: (vendorId: string) => KycRecord | undefined;
  submit: (vendorId: string, input: KycInput) => void;
  approve: (vendorId: string) => void;
  reject: (vendorId: string, reason: string) => void;
};

export const useKyc = create<KycState>()(
  persist(
    (set, get) => ({
      records: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      forVendor: (vendorId) => get().records.find((r) => r.vendorId === vendorId),
      submit: (vendorId, input) =>
        set((state) => {
          const record: KycRecord = {
            ...input,
            vendorId,
            status: "pending",
            submittedAt: new Date().toISOString(),
          };
          const others = state.records.filter((r) => r.vendorId !== vendorId);
          return { records: [record, ...others] };
        }),
      approve: (vendorId) =>
        set((state) => ({
          records: state.records.map((r) =>
            r.vendorId === vendorId
              ? {
                  ...r,
                  status: "approved",
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: undefined,
                }
              : r,
          ),
        })),
      reject: (vendorId, reason) =>
        set((state) => ({
          records: state.records.map((r) =>
            r.vendorId === vendorId
              ? {
                  ...r,
                  status: "rejected",
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: reason.trim() || "Details could not be verified.",
                }
              : r,
          ),
        })),
    }),
    {
      name: "shopco-kyc",
      partialize: (state) => ({ records: state.records }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

/** Status of the given vendor (defaults to not_submitted). */
export function useKycStatus(vendorId: string | undefined): {
  status: KycStatus;
  hydrated: boolean;
  record?: KycRecord;
} {
  const records = useKyc((s) => s.records);
  const hydrated = useKyc((s) => s.hydrated);
  const record = vendorId ? records.find((r) => r.vendorId === vendorId) : undefined;
  return { status: record?.status ?? "not_submitted", hydrated, record };
}
