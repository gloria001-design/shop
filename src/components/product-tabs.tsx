"use client";

import { useState } from "react";
import { BadgeCheck, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/src/types/product";
import { reviews as allReviews } from "@/src/lib/products";
import { Stars } from "@/src/components/stars";

const tabs = ["Product Details", "Rating & Reviews", "FAQs"] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Rating & Reviews");
  const [visible, setVisible] = useState(6);
  const own = allReviews.filter((r) => r.productId === product.id);
  const list = own.length > 0 ? own : allReviews;

  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex border-b border-black/10">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 pb-5 text-center text-sm sm:text-base ${
              tab === t
                ? "border-b-2 border-black font-medium text-black"
                : "text-black/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Product Details" && (
        <div className="py-8 text-black/60">
          <p className="max-w-3xl leading-relaxed">{product.description}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5">
            <li>Style: {product.style}</li>
            <li>Type: {product.type}</li>
            <li>Available sizes: {product.sizes.join(", ")}</li>
            <li>Colors: {product.colors.map((c) => c.name).join(", ")}</li>
          </ul>
        </div>
      )}

      {tab === "FAQs" && (
        <div className="space-y-4 py-8">
          {[
            ["What is the return policy?", "Free returns within 30 days of delivery."],
            ["How long does shipping take?", "Standard shipping takes 3–5 business days."],
            ["Do you ship internationally?", "Yes, we ship to over 50 countries."],
          ].map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-black/10 p-4">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-sm text-black/60">{a}</p>
            </details>
          ))}
        </div>
      )}

      {tab === "Rating & Reviews" && (
        <div className="py-6 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold sm:text-2xl">
              All Reviews{" "}
              <span className="text-base font-normal text-black/60">
                ({product.reviewsCount})
              </span>
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full bg-muted sm:size-12"
                aria-label="Filter reviews"
              >
                <SlidersHorizontal className="size-5" />
              </button>
              <select className="hidden h-12 rounded-full bg-muted px-5 text-sm font-medium outline-none sm:block">
                <option>Latest</option>
                <option>Highest</option>
                <option>Lowest</option>
              </select>
              <button
                type="button"
                className="h-10 rounded-full bg-black px-4 text-xs font-medium text-white sm:h-12 sm:px-5 sm:text-sm"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {list.slice(0, visible).map((r) => (
              <article
                key={r.id}
                className="rounded-[20px] border border-black/10 px-6 py-6 sm:px-8 sm:py-7"
              >
                <Stars rating={r.rating} />
                <div className="mt-4 flex items-center gap-1.5">
                  <h4 className="text-lg font-bold sm:text-xl">{r.name}</h4>
                  {r.verified && (
                    <BadgeCheck className="size-5 fill-[#01AB31] text-white" />
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/60 sm:text-base">
                  &ldquo;{r.comment}&rdquo;
                </p>
                <p className="mt-5 text-sm font-medium text-black/60">
                  Posted on {r.date}
                </p>
              </article>
            ))}
          </div>

          {visible < list.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 4)}
                className="h-[46px] rounded-full border border-black/10 px-9 text-sm transition hover:bg-muted"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
