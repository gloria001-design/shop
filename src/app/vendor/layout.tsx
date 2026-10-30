import { VendorShell } from "@/src/components/vendor-shell";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <VendorShell>{children}</VendorShell>;
}
