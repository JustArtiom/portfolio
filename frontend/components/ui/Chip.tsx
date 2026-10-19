import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-line rounded-full bg-bg cursor-default",
  {
    variants: {
      variant: {
        default: "text-[11px] text-ink-2",
        mono: "text-[11px] font-mono text-ink-2",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type ChipProps = {
  children: ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
} & VariantProps<typeof chipVariants>;

export default function Chip({
  children,
  icon: Icon,
  variant,
  className,
}: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant }), className)}>
      {Icon && <Icon className="w-3 h-3 text-accent" />}
      {children}
    </span>
  );
}
