"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthButton, AuthField, AuthShell } from "@/src/components/auth-shell";
import { useAuth } from "@/src/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, hydrated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (hydrated && user) router.replace("/");
  }, [hydrated, user, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    const result = login({ email, password });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/");
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
        <Link href="/signup" className="font-medium text-black underline underline-offset-2">
          Sign Up
        </Link>
      </p>
    </AuthShell>
  );
}
