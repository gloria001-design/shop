import Link from "next/link";
import type { Product } from "@/src/types/product";
import { ProductCard } from "@/src/components/product-card";
import { SectionHeading } from "@/src/components/section-heading";

export function ProductSection({
  title,
  items,
  href = "/products",
}: {
  title: string;
  items: Product[];
  href?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading className="text-center">{title}</SectionHeading>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-5 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-8 flex justify-center sm:mt-10">
        <Link
          href={href}
          className="inline-flex h-[46px] w-full max-w-[218px] items-center justify-center rounded-full border border-black/10 text-base transition hover:bg-muted"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
