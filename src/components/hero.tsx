import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export function Hero() {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-8 lg:pt-0">
        <div className="py-4 lg:py-20">
          <h1 className="font-integral text-[36px] leading-[1.05] uppercase sm:text-[48px] lg:text-[64px]">
            Find clothes that matches your style
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-black/60 sm:text-base">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-black px-14 text-base font-medium text-white transition hover:bg-black/85 sm:w-auto"
          >
            Shop Now
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-y-3 sm:justify-start divide-x-0 sm:mt-12">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 text-center sm:text-left ${i === 0 ? "sm:pl-0" : "sm:px-8"} ${i < stats.length - 1 ? "border-black/10 sm:border-r" : ""}`}
              >
                <p className="text-2xl font-bold sm:text-[40px] sm:leading-none">{s.value}</p>
                <p className="mt-1 text-xs text-black/60 sm:text-base">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-xl lg:aspect-auto lg:h-[663px] lg:max-w-none">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt="Fashion models in style"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <Sparkle className="absolute left-4 top-16 size-14 sm:left-8 sm:size-20 lg:left-0" />
          <Sparkle className="absolute right-4 top-8 size-10 sm:right-10 sm:top-20 sm:size-14" />
        </div>
      </div>
    </section>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden>
      <path
        d="M28 0L31.5 24.5L56 28L31.5 31.5L28 56L24.5 31.5L0 28L24.5 24.5L28 0Z"
        fill="black"
      />
    </svg>
  );
}

export function BrandsStrip() {
  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];
  return (
    <div id="brands" className="bg-black py-7 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-4 sm:justify-between sm:px-6 lg:px-8">
        {brands.map((b) => (
          <span
            key={b}
            className="text-xl font-bold tracking-wide text-white sm:text-2xl lg:text-[32px]"
            style={{ fontFamily: b === "Calvin Klein" ? "Georgia, serif" : undefined }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
