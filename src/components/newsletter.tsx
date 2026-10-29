"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-8 rounded-[20px] bg-black px-6 py-8 text-white sm:rounded-[32px] sm:px-12 sm:py-11 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="font-integral max-w-xl text-[32px] leading-[1.1] uppercase sm:text-[40px]">
        Stay upto date about our latest offers
      </h2>
      <form onSubmit={onSubmit} className="flex w-full max-w-[350px] flex-col gap-3">
        <label className="relative block">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black/40" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="h-12 w-full rounded-full bg-white pl-12 pr-4 text-sm text-black outline-none placeholder:text-black/40"
          />
        </label>
        <button
          type="submit"
          className="h-12 rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/90"
        >
          {done ? "Subscribed!" : "Subscribe to Newsletter"}
        </button>
      </form>
    </div>
  );
}
