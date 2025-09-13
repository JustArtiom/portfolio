import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("transition-colors", {
  variants: {
    variant: {
      primary: "bg-secondary border border-accent/20 hover:border-accent/50",
    },
    size: {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
    rounded: {
      none: "rounded-none",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: "md",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
}

export default function Card({
  children,
  variant,
  size,
  rounded,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cardVariants({ variant, size, rounded, className })}
      {...props}
    >
      {children}
    </div>
  );
}
