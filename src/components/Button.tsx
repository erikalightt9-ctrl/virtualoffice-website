import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "onDark" | "quiet";

const styles: Record<Variant, string> = {
  solid:
    "accent-fill border",
  outline:
    "bg-transparent text-ink border border-rule-strong hover:border-ink hover:bg-surface",
  onDark:
    "bg-transparent text-on-dark border border-rule-dark hover:border-on-dark hover:bg-white/5",
  quiet:
    "bg-surface text-ink border border-rule hover:border-rule-strong",
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.09em] transition-colors duration-150";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
