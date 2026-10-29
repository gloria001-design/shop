import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[480px]">
        <div className="rounded-[20px] border border-black/10 bg-white p-6 sm:rounded-[32px] sm:p-10">
          <Link href="/" className="font-integral text-2xl sm:text-[28px]">
            SHOP.CO
          </Link>
          <h1 className="font-integral mt-6 text-[28px] uppercase leading-none sm:text-[36px]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-black/60 sm:text-base">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-full bg-muted px-5 text-sm outline-none ring-black/20 placeholder:text-black/40 focus:ring-2"
      />
    </label>
  );
}

export function AuthButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85 disabled:opacity-60"
    >
      {children}
    </button>
  );
}
