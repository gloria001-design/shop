"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthButton, AuthField, AuthShell } from "@/src/components/auth-shell";
import { useAuth } from "@/src/hooks/use-auth";
import { safeNext } from "@/src/lib/safe-next";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const { signup, user, hydrated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (hydrated && user) router.replace(next);
  }, [hydrated, user, next, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setPending(true);
    const result = signup({ name, email, password });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Sign up and get 20% off your first order."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField
          id="name"
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="Your name"
          autoComplete="name"
        />
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
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <AuthField
          id="confirm"
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />
        {error && (
          <p className="rounded-2xl bg-discount/10 px-4 py-3 text-sm text-discount">
            {error}
          </p>
        )}
        <AuthButton disabled={pending}>
          {pending ? "Creating account…" : "Sign Up"}
        </AuthButton>
      </form>
      <p className="mt-6 text-center text-sm text-black/60">
        Already have an account?{" "}
        <Link
          href={`/login${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-black underline underline-offset-2"
        >
          Log In
        </Link>
      </p>
    </AuthShell>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="py-20 text-center text-black/60">Loading…</main>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
