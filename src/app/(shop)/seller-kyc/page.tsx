"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthButton,
  AuthField,
  AuthFile,
  AuthSelect,
  AuthShell,
} from "@/src/components/auth-shell";
import { AuthLoading, useRequireAuth } from "@/src/components/require-auth";
import { useKyc, useKycStatus, type KycInput } from "@/src/hooks/use-kyc";

const idTypes = [
  { value: "national_id", label: "National ID" },
  { value: "passport", label: "International passport" },
  { value: "drivers_license", label: "Driver's license" },
  { value: "business_reg", label: "Business registration (CAC)" },
];

const outlineBtn =
  "flex h-12 w-full items-center justify-center rounded-full border border-black/10 text-sm font-medium transition hover:bg-muted";

function Steps({ step }: { step: number }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-black" : "bg-muted"}`}
        />
      ))}
      <span className="ml-2 text-xs text-black/60">Step {step} of 3</span>
    </div>
  );
}

export default function SellerKycPage() {
  const router = useRouter();
  const { user, ready } = useRequireAuth("vendor");
  const submit = useKyc((s) => s.submit);
  const { status, record, hydrated } = useKycStatus(user?.id);

  const [step, setStep] = useState(1);
  const [resubmitting, setResubmitting] = useState(false);
  const [error, setError] = useState("");

  const [businessName, setBusinessName] = useState(user?.storeName ?? "");
  const [businessType, setBusinessType] =
    useState<KycInput["businessType"]>("individual");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [address, setAddress] = useState("");
  const [idType, setIdType] = useState<KycInput["idType"]>("national_id");
  const [idNumber, setIdNumber] = useState("");
  const [idDocumentName, setIdDocumentName] = useState("");
  const [selfieName, setSelfieName] = useState("");

  if (!ready || !user || !hydrated) return <AuthLoading />;

  // Already submitted: show status in the same card style.
  if (status !== "not_submitted" && !(status === "rejected" && resubmitting)) {
    const copy = {
      pending: {
        title: "Under review",
        text: "We received your details. You can start listing products as soon as your verification is approved.",
      },
      approved: {
        title: "You're verified",
        text: "Your account is approved. You can now list and sell products.",
      },
      rejected: {
        title: "Not approved",
        text: `Reason: ${record?.rejectionReason ?? "Details could not be verified."}`,
      },
    }[status as "pending" | "approved" | "rejected"];

    return (
      <AuthShell title={copy.title} subtitle={copy.text}>
        <div className="space-y-3">
          {status === "rejected" && (
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setResubmitting(true);
              }}
              className="flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white"
            >
              Resubmit details
            </button>
          )}
          <Link
            href="/vendor"
            className={
              status === "approved"
                ? "flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white"
                : outlineBtn
            }
          >
            Go to vendor dashboard
          </Link>
        </div>
      </AuthShell>
    );
  }

  function next(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (step === 1) {
      if (!businessName.trim() || !phone.trim() || !country.trim() || !address.trim()) {
        setError("Please fill in all your business details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (idNumber.trim().length < 4) {
        setError("Enter your ID number (at least 4 characters).");
        return;
      }
      if (!idDocumentName || !selfieName) {
        setError("Please attach your ID document and a selfie.");
        return;
      }
      setStep(3);
    } else {
      submit(user!.id, {
        businessName: businessName.trim(),
        businessType,
        phone: phone.trim(),
        country: country.trim(),
        address: address.trim(),
        idType,
        idLast4: idNumber.trim().slice(-4),
        idDocumentName,
        selfieName,
      });
      setIdNumber("");
      setResubmitting(false);
    }
  }

  const titles = {
    1: ["Business details", "Tell us about you and your store."],
    2: ["Verify your ID", "We need to confirm who you are before you can sell."],
    3: ["Review & submit", "Check everything looks right."],
  } as const;

  return (
    <AuthShell title={titles[step as 1 | 2 | 3][0]} subtitle={titles[step as 1 | 2 | 3][1]}>
      <Steps step={step} />
      <form onSubmit={next} className="space-y-4">
        {step === 1 && (
          <>
            <AuthField id="businessName" label="Legal / business name" value={businessName} onChange={setBusinessName} placeholder="Your store or full name" />
            <AuthSelect
              id="businessType"
              label="Seller type"
              value={businessType}
              onChange={(v) => setBusinessType(v as KycInput["businessType"])}
              options={[
                { value: "individual", label: "Individual" },
                { value: "registered_business", label: "Registered business" },
              ]}
            />
            <AuthField id="phone" label="Phone number" value={phone} onChange={setPhone} placeholder="+234 ..." autoComplete="tel" />
            <AuthField id="country" label="Country" value={country} onChange={setCountry} autoComplete="country-name" />
            <AuthField id="address" label="Address" value={address} onChange={setAddress} placeholder="Street, city" autoComplete="street-address" />
          </>
        )}

        {step === 2 && (
          <>
            <AuthSelect id="idType" label="ID type" value={idType} onChange={(v) => setIdType(v as KycInput["idType"])} options={idTypes} />
            <AuthField id="idNumber" label="ID number" value={idNumber} onChange={setIdNumber} placeholder="Enter your ID number" autoComplete="off" />
            <AuthFile id="idDoc" label="Upload ID document" fileName={idDocumentName} onChange={setIdDocumentName} />
            <AuthFile id="selfie" label="Selfie holding your ID" fileName={selfieName} onChange={setSelfieName} accept="image/*" />
          </>
        )}

        {step === 3 && (
          <dl className="space-y-3 rounded-[20px] bg-muted p-5 text-sm">
            {[
              ["Business name", businessName],
              ["Seller type", businessType === "individual" ? "Individual" : "Registered business"],
              ["Phone", phone],
              ["Address", `${address}, ${country}`],
              ["ID", `${idTypes.find((t) => t.value === idType)?.label} ending ${idNumber.trim().slice(-4)}`],
              ["Files", `${idDocumentName}, ${selfieName}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-black/60">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {error && (
          <p className="rounded-2xl bg-discount/10 px-4 py-3 text-sm text-discount">{error}</p>
        )}

        <AuthButton>{step === 3 ? "Submit for review" : "Continue"}</AuthButton>
        {step > 1 && (
          <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className={outlineBtn}>
            Back
          </button>
        )}
      </form>
      <p className="mt-6 text-center text-sm text-black/60">
        <button type="button" onClick={() => router.push("/vendor")} className="font-medium text-black underline underline-offset-2">
          Do this later
        </button>
      </p>
    </AuthShell>
  );
}
