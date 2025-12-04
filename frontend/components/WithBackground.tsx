import { cn } from "@/utils/cn";

export interface WithBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  element: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function WithBackground({
  element,
  children,
  className,
  ...props
}: WithBackgroundProps) {
  return (
    <div {...props} className={cn("relative", className)}>
      <div className="absolute inset-0">{element}</div>
      <div className="relative">{children}</div>
    </div>
  );
}
