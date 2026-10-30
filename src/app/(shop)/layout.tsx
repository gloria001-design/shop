import { PromoBar } from "@/src/components/promo-bar";
import { SiteHeader } from "@/src/components/site-header";
import { SiteFooter } from "@/src/components/site-footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
