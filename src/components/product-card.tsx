import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/src/types/product";
import { discountPercent } from "@/src/lib/products";
import { Stars } from "@/src/components/stars";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-base font-bold sm:text-xl">{product.name}</h3>
      <div className="mt-1 flex items-center gap-2">
        <Stars rating={product.rating} size={16} />
        <span className="text-sm">
          {product.rating}/<span className="text-black/40">5</span>
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2.5">
        <span className="text-xl font-bold sm:text-2xl">${product.price}</span>
        {product.originalPrice != null && (
          <>
            <span className="text-xl font-bold text-black/40 line-through sm:text-2xl">
              ${product.originalPrice}
            </span>
            <span className="rounded-full bg-discount/10 px-3.5 py-1.5 text-xs font-medium text-discount">
              -{discount}%
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
