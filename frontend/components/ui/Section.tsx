import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionProps } from "@/utils/motion";
import { cn } from "@/utils/cn";

export default function Section({
  id,
  num,
  title,
  sub,
  children,
  className,
}: {
  id: string;
  num: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "max-w-page mx-auto px-5 md:px-10 pt-[134px] pb-24 scroll-mt-[100px]",
        className
      )}
    >
      <motion.div
        {...motionProps({ side: "bottom", distance: 24 })}
        className="flex items-baseline gap-6 mb-12 pt-6 border-t border-line"
      >
        <span className="font-mono text-xs tracking-wider text-muted min-w-[60px]">
          {num} /
        </span>
        <h2 className="text-[clamp(32px,3.8vw,48px)] leading-none tracking-[-0.03em] font-medium m-0">
          {title}
        </h2>
        <span className="flex-1" />
      </motion.div>
      {sub && (
        <motion.p
          {...motionProps({ side: "bottom", distance: 20, delay: 0.1 })}
          className="text-lg text-muted max-w-[60ch] mb-12 md:ml-[84px] text-pretty"
        >
          {sub}
        </motion.p>
      )}
      {children}
    </section>
  );
}
