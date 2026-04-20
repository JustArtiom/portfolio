import { motion } from "framer-motion";
import { motionProps } from "@/utils/motion";

export default function SectionHead({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  return (
    <>
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
    </>
  );
}
