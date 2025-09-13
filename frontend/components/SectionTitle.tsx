import { cn } from "@/utils/cn";
import { motionProps } from "@/utils/motion";
import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <motion.p
      className={cn(
        `text-xl tracking-widest dark:text-gray-400 text-gray-600 mb-10`,
        className
      )}
      {...motionProps({ side: "left" })}
    >
      {title}
    </motion.p>
  );
}
