import { AdminProductForm } from "@/src/components/admin-product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-integral text-[32px] uppercase leading-none sm:text-5xl">
        Add product
      </h1>
      <p className="mt-3 mb-8 text-black/60">Create a piece in the SHOP.CO catalog.</p>
      <AdminProductForm />
    </div>
  );
}
