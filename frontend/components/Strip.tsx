import type { ReactNode } from "react";
import { motion } from "framer-motion";
import MetaLabel from "./ui/MetaLabel";
import { motionProps } from "@/utils/motion";

export default function Strip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      {...motionProps({ side: "bottom", distance: 24 })}
      className="md:pl-[84px] pt-8 pb-4 border-t border-dashed border-line grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8 items-baseline mb-2"
    >
      <MetaLabel>{label}</MetaLabel>
      {children}
    </motion.div>
  );
}
