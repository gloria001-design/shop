"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "user" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeName?: string;
};

type StoredUser = AuthUser & { password: string };

export const ADMIN_EMAIL = "admin@shop.co";
export const ADMIN_PASSWORD = "admin123";

const seedAdmin: StoredUser = {
  id: "admin-shopco",
  name: "SHOP.CO Admin",
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  role: "admin",
};

function withRole(user: Partial<StoredUser> & Pick<StoredUser, "id" | "name" | "email">): StoredUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password ?? "",
    role:
      user.role === "admin" || user.email === ADMIN_EMAIL
        ? "admin"
        : user.role === "vendor"
          ? "vendor"
          : "user",
    storeName: user.storeName,
  };
}

function publicUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    storeName: user.storeName,
  };
}

function ensureAdmin(users: StoredUser[]) {
  const next = users.map((u) => withRole(u));
  if (!next.some((u) => u.email === ADMIN_EMAIL)) next.unshift(seedAdmin);
  else {
    const i = next.findIndex((u) => u.email === ADMIN_EMAIL);
    next[i] = { ...next[i], role: "admin", password: next[i].password || ADMIN_PASSWORD };
  }
  return next;
}

type AuthState = {
  user: AuthUser | null;
  users: StoredUser[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  signup: (input: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "vendor";
    storeName?: string;
  }) => { ok: true } | { ok: false; error: string };
  login: (input: {
    email: string;
    password: string;
  }) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [seedAdmin],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      signup: ({ name, email, password, role = "user", storeName }) => {
        const normalized = email.trim().toLowerCase();
        if (!name.trim() || !normalized || password.length < 6) {
          return {
            ok: false,
            error: "Please fill all fields. Password must be at least 6 characters.",
          };
        }
        if (role === "vendor" && !storeName?.trim()) {
          return { ok: false, error: "Please enter your store name." };
        }
        if (normalized === ADMIN_EMAIL) {
          return { ok: false, error: "This email is reserved. Please use another." };
        }
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const account: StoredUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: normalized,
          password,
          role: role === "vendor" ? "vendor" : "user",
          storeName: role === "vendor" ? (storeName ?? "").trim() : undefined,
        };
        set((state) => ({
          users: [...state.users, account],
          user: publicUser(account),
        }));
        return { ok: true };
      },
      login: ({ email, password }) => {
        const normalized = email.trim().toLowerCase();
        const match = get().users.find(
          (u) => u.email === normalized && u.password === password,
        );
        if (!match) {
          return { ok: false, error: "Invalid email or password." };
        }
        set({ user: publicUser(withRole(match)) });
        return { ok: true };
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "shopco-auth",
      partialize: (state) => ({ user: state.user, users: state.users }),
      merge: (persisted, current) => {
        const p = (persisted as Partial<AuthState> | undefined) ?? {};
        const users = ensureAdmin(
          (p.users ?? current.users).map((u) => withRole(u as StoredUser)),
        );
        const rawUser = p.user;
        const matched = rawUser
          ? users.find((u) => u.id === rawUser.id || u.email === rawUser.email)
          : undefined;
        return {
          ...current,
          ...p,
          users,
          user: matched ? publicUser(matched) : null,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
