import { BrandsStrip, Hero } from "@/src/components/hero";
import { ProductSection } from "@/src/components/product-section";
import { DressStyle } from "@/src/components/dress-style";
import { Testimonials } from "@/src/components/testimonials";
import { newArrivals, topSelling } from "@/src/lib/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsStrip />
      <ProductSection title="New Arrivals" items={newArrivals} href="/products?new=1" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-black/10" />
      </div>
      <ProductSection title="Top Selling" items={topSelling} href="/products" />
      <DressStyle />
      <Testimonials />
    </main>
  );
}
