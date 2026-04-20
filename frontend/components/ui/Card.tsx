import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const cardVariants = cva("border border-line", {
  variants: {
    surface: { glass: "glass", solid: "bg-bg" },
    rounded: {
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
      xl: "p-7",
    },
  },
  defaultVariants: { surface: "glass", rounded: "xl", padding: "md" },
});

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "aside" | "article";
} & VariantProps<typeof cardVariants> &
  Omit<HTMLMotionProps<"div">, "children">;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, surface, rounded, padding, as = "div", ...rest },
    ref
  ) => {
    const Tag = motion[as] as typeof motion.div;
    return (
      <Tag
        ref={ref}
        className={cn(cardVariants({ surface, rounded, padding }), className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);
Card.displayName = "Card";

export default Card;
