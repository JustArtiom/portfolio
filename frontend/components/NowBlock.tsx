import { motion } from "framer-motion";
import Card from "./ui/Card";
import MetaLabel from "./ui/MetaLabel";
import { nowDoing } from "@/constants";
import { staggerChild, staggerOnScroll } from "@/utils/motion";

export default function NowBlock() {
  return (
    <Card
      variants={staggerChild({ side: "bottom", distance: 24 })}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="relative mt-9 overflow-hidden"
    >
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.17_145)] animate-now-breath inline-block" />
        <MetaLabel>Right now</MetaLabel>
      </div>
      <motion.ul {...staggerOnScroll(0.06)} className="grid gap-1.5 list-none m-0 p-0">
        {nowDoing.map((n) => (
          <motion.li
            key={n.key}
            variants={staggerChild({ side: "left", distance: 20 })}
            className="text-[15px] text-ink-2"
          >
            <MetaLabel className="inline-block min-w-[82px] pr-2">
              {n.key}
            </MetaLabel>
            {n.text}
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
}
