import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none outline-accent",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent/80",
        destructive: "",
        outline: "border border-input border-accent/20 hover:border-accent",
        ghost: "",
        link: "",
      },
      size: {
        default: "py-2.5 px-5",
        sm: "px-3 rounded-md",
        lg: "px-8 rounded-md",
        icon: "w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
