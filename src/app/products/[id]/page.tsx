import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductPurchase } from "@/src/components/product-purchase";
import { ProductTabs } from "@/src/components/product-tabs";
import { ProductCard } from "@/src/components/product-card";
import { SectionHeading } from "@/src/components/section-heading";
import { getProduct, products } from "@/src/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 border-t border-black/10 py-5 text-sm text-black/60"
      >
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href="/products" className="hover:text-black">
          Shop
        </Link>
        <ChevronRight className="size-4" />
        <Link href={`/products?style=${product.style}`} className="hover:text-black">
          {product.style}
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-black">{product.type}</span>
      </nav>

      <ProductPurchase product={product} />
      <ProductTabs product={product} />

      <section className="mt-14 sm:mt-20">
        <SectionHeading className="text-center">You might also like</SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="py-20 text-center text-black/60">Loading product…</div>
        }
      >
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}
