import type { Metadata } from "next";
import { Archivo_Black, Manrope } from "next/font/google";
import "./globals.css";

const integral = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-integral",
});

const satoshi = Manrope({
  subsets: ["latin"],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "SHOP.CO — Find clothes that matches your style",
  description:
    "Browse through our diverse range of meticulously crafted garments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${integral.variable} ${satoshi.variable} min-h-screen bg-white font-sans text-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
