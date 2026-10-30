import { Suspense } from "react";
import { ProductDetail } from "@/src/components/product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="py-20 text-center text-black/60">Loading product…</div>
        }
      >
        <ProductDetail id={id} />
      </Suspense>
    </main>
  );
}
