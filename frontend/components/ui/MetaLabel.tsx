import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Tag = "span" | "div" | "p" | "dt";

export default function MetaLabel({
  children,
  as = "span",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-mono text-[11px] text-muted uppercase tracking-wider",
        className
      )}
    >
      {children}
    </Tag>
  );
}
