"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthButton, AuthField, AuthShell } from "@/src/components/auth-shell";
import { useAuth } from "@/src/hooks/use-auth";
import { safeNext } from "@/src/lib/safe-next";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const { login, user, hydrated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!hydrated || !user) return;
    router.replace(user.role === "admin" && next === "/" ? "/admin" : next);
  }, [hydrated, user, next, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    const result = login({ email, password });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to track orders, save favorites, and checkout faster."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        {error && (
          <p className="rounded-2xl bg-discount/10 px-4 py-3 text-sm text-discount">
            {error}
          </p>
        )}
        <AuthButton disabled={pending}>{pending ? "Logging in…" : "Log In"}</AuthButton>
      </form>
      <p className="mt-6 text-center text-sm text-black/60">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-black underline underline-offset-2"
        >
          Sign Up
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-black/40">
        Admin demo: admin@shop.co / admin123
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="py-20 text-center text-black/60">Loading…</main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
