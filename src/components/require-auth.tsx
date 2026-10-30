"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/src/hooks/use-auth";

export function useRequireAuth(role?: UserRole) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (role && user.role !== role) {
      router.replace(
        user.role === "admin"
          ? "/admin"
          : user.role === "vendor"
            ? "/vendor"
            : "/account",
      );
    }
  }, [hydrated, user, role, pathname, router]);

  return {
    user,
    hydrated,
    ready: hydrated && !!user && (!role || user.role === role),
  };
}

export function AuthLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 text-black/60">
      Loading…
    </div>
  );
}
