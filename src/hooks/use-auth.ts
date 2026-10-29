"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = AuthUser & { password: string };

type AuthState = {
  user: AuthUser | null;
  users: StoredUser[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  signup: (input: {
    name: string;
    email: string;
    password: string;
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
      users: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      signup: ({ name, email, password }) => {
        const normalized = email.trim().toLowerCase();
        if (!name.trim() || !normalized || password.length < 6) {
          return {
            ok: false,
            error: "Please fill all fields. Password must be at least 6 characters.",
          };
        }
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const account: StoredUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: normalized,
          password,
        };
        set((state) => ({
          users: [...state.users, account],
          user: { id: account.id, name: account.name, email: account.email },
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
        set({
          user: { id: match.id, name: match.name, email: match.email },
        });
        return { ok: true };
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "shopco-auth",
      partialize: (state) => ({ user: state.user, users: state.users }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
