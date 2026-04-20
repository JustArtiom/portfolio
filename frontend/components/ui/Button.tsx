import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  "group inline-flex items-center gap-2.5 rounded-full border transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-bg border-transparent hover:bg-accent dark:hover:text-white",
        ghost: "border-line text-ink hover:border-ink",
      },
      size: {
        md: "px-5.5 py-3.5 text-[15px]",
        sm: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  arrow?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const hoverMotion = { y: -2 };
const tapMotion = { scale: 0.97 };

function Arrow() {
  return (
    <span className="transition-transform group-hover:translate-x-1">→</span>
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & HTMLMotionProps<"button">
>(({ className, variant, size, arrow, children, disabled, ...props }, ref) => (
  <motion.button
    ref={ref}
    disabled={disabled}
    whileHover={disabled ? undefined : hoverMotion}
    whileTap={disabled ? undefined : tapMotion}
    className={cn(
      buttonVariants({ variant, size }),
      disabled && "opacity-70 cursor-wait",
      className
    )}
    {...props}
  >
    {children}
    {arrow && <Arrow />}
  </motion.button>
));
Button.displayName = "Button";

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  CommonProps & HTMLMotionProps<"a">
>(({ className, variant, size, arrow, children, ...props }, ref) => (
  <motion.a
    ref={ref}
    whileHover={hoverMotion}
    whileTap={tapMotion}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    {arrow && <Arrow />}
  </motion.a>
));
ButtonLink.displayName = "ButtonLink";
