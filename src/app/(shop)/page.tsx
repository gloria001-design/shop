import { BrandsStrip, Hero } from "@/src/components/hero";
import { CatalogSections } from "@/src/components/catalog-sections";
import { DressStyle } from "@/src/components/dress-style";
import { Testimonials } from "@/src/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsStrip />
      <CatalogSections />
      <DressStyle />
      <Testimonials />
    </main>
  );
}
