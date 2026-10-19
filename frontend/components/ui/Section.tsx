import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { reveal } from "@/utils/motion";

export default function Section({
  id,
  title,
  sub,
  children,
  className,
}: {
  id: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "max-w-page mx-auto px-5 md:px-10 pt-14 md:pt-20 pb-10 md:pb-14 scroll-mt-[100px]",
        className
      )}
    >
      <motion.div {...reveal}>
        <div className="mb-10 pt-6 border-t border-line">
          <h2 className="text-[clamp(32px,3.8vw,48px)] leading-none tracking-[-0.03em] font-medium m-0">
            {title}
          </h2>
        </div>
        {sub && (
          <p className="text-lg text-muted max-w-[60ch] mb-10 text-pretty">
            {sub}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
