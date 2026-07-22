import { motion } from "framer-motion";
import MetaLabel from "./ui/MetaLabel";
import { nowDoing } from "@/constants";
import { staggerChild, staggerOnScroll } from "@/utils/motion";

export default function NowBlock() {
  return (
    <motion.div
      variants={staggerChild({ side: "bottom", distance: 24 })}
      className="relative mt-10 pt-7 border-t border-line"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.17_145)] animate-now-breath inline-block" />
        <MetaLabel>Right now</MetaLabel>
      </div>
      <motion.dl
        {...staggerOnScroll(0.06)}
        className="grid gap-y-3 list-none m-0 p-0"
      >
        {nowDoing.map((n) => (
          <motion.div
            key={n.key}
            variants={staggerChild({ side: "left", distance: 20 })}
            className="grid grid-cols-[100px_1fr] items-baseline gap-4"
          >
            <MetaLabel as="dt">{n.key}</MetaLabel>
            <dd className="m-0 text-[15px] text-ink-2">{n.text}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </motion.div>
  );
}
