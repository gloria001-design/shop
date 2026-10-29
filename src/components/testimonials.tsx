"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import { testimonials } from "@/src/lib/products";
import { SectionHeading } from "@/src/components/section-heading";
import { Stars } from "@/src/components/stars";

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading>Our happy customers</SectionHeading>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="rounded-full p-1 transition hover:bg-muted"
          >
            <ArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="rounded-full p-1 transition hover:bg-muted"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-8 flex gap-5 overflow-x-auto pb-2 scrollbar-none sm:mt-10"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="w-[min(100%,358px)] shrink-0 rounded-[20px] border border-black/10 px-7 py-6 sm:w-[400px]"
          >
            <Stars rating={t.rating} />
            <div className="mt-4 flex items-center gap-1.5">
              <h3 className="text-xl font-bold">{t.name}</h3>
              <BadgeCheck className="size-5 fill-[#01AB31] text-white" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-black/60 sm:text-base">
              &ldquo;{t.comment}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
