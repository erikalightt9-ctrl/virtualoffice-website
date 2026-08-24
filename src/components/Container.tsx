import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** "wide" for full layouts, "prose" for reading-width text. */
  width?: "wide" | "prose";
  className?: string;
};

export default function Container({
  children,
  width = "wide",
  className = "",
}: Props) {
  const max = width === "prose" ? "max-w-3xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
