import Link from "next/link";
import { Newsletter } from "@/src/components/newsletter";

const columns = [
  {
    title: "Company",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
];

const socials = [
  {
    label: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.251 5.69L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H17l-.4 3h-2.6v7A10 10 0 0 0 22 12z",
  },
  {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.5 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  },
  {
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#F0F0F0] pt-0 sm:mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-translate-y-1/4 sm:-translate-y-[40%]">
          <Newsletter />
        </div>

        <div className="grid gap-8 pb-12 pt-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-6">
          <div>
            <Link href="/" className="font-integral text-[28px] sm:text-[33px]">
              SHOP.CO
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/60">
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white"
                  aria-label={s.label}
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-base font-medium uppercase tracking-[3px]">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-black/60">
                {col.links.map((label) => (
                  <li key={label}>
                    <Link href="/products" className="hover:text-black">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 py-6 text-sm text-black/60 sm:flex-row">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>
          <div className="flex flex-wrap items-center gap-2">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-black/5 bg-white px-3 py-1.5 text-xs font-semibold text-black"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
