import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const chipVariants = cva(
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
  hoverable?: boolean;
  className?: string;
} & VariantProps<typeof chipVariants> &
  Omit<HTMLMotionProps<"span">, "children">;

export default function Chip({
  children,
  icon: Icon,
  variant,
  className,
  hoverable = true,
  ...rest
}: ChipProps) {
  return (
    <motion.span
      whileHover={
        hoverable ? { y: -2, borderColor: "var(--color-accent)" } : undefined
      }
      className={cn(chipVariants({ variant }), className)}
      {...rest}
    >
      {Icon && <Icon className="w-3 h-3 text-accent" />}
      {children}
    </motion.span>
  );
}
