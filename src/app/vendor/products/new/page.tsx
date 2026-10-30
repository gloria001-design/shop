"use client";

import { AdminProductForm } from "@/src/components/admin-product-form";
import { KycGate } from "@/src/components/kyc-gate";
import { useAuth } from "@/src/hooks/use-auth";

export default function VendorNewProductPage() {
  const user = useAuth((s) => s.user);
  if (!user) return null;

  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Add product
      </h1>
      <p className="mt-3 mb-8 text-black/60">
        This will be listed in the store as sold by{" "}
        {user.storeName ?? user.name}.
      </p>
      <KycGate>
        <AdminProductForm
          basePath="/vendor/products"
          vendor={{ id: user.id, name: user.storeName ?? user.name }}
        />
      </KycGate>
    </div>
  );
}
