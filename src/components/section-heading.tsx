import { cn } from "cn";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-integral text-[32px] leading-none uppercase sm:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
