import Image from "next/image";
import Link from "next/link";
import { dressStyles } from "@/src/lib/products";
import { SectionHeading } from "@/src/components/section-heading";

export function DressStyle() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[24px] bg-muted px-6 py-10 sm:rounded-[40px] sm:px-12 sm:py-16">
        <SectionHeading className="text-center">Browse by dress style</SectionHeading>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {dressStyles.map((style, i) => {
            const span2 = i === 1 || i === 2;
            return (
              <Link
                key={style.name}
                href={`/products?style=${style.name}`}
                className={`group relative h-[190px] overflow-hidden rounded-[20px] bg-white sm:h-[289px] ${
                  span2 ? "sm:col-span-2" : "sm:col-span-1"
                }`}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute left-6 top-5 text-2xl font-bold sm:left-9 sm:top-6 sm:text-4xl">
                  {style.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
