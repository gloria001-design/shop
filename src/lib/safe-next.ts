const FALLBACK = "/";

export function safeNext(value: string | null | undefined, fallback = FALLBACK) {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.startsWith("/login") || value.startsWith("/signup")) return fallback;
  return value;
}
