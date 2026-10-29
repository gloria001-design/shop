import { Suspense } from "react";
import { ProductListing } from "@/src/components/product-listing";

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{
    style?: string;
    q?: string;
    sale?: string;
    new?: string;
  }>;
}) {
  const { style, q, sale, new: isNew } = await searchParams;
  return (
    <ProductListing
      initialStyle={style}
      initialQuery={q}
      initialSale={sale === "1"}
      initialNew={isNew === "1"}
    />
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    style?: string;
    q?: string;
    sale?: string;
    new?: string;
  }>;
}) {
  return (
    <main>
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-black/60">
            Loading products…
          </div>
        }
      >
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
