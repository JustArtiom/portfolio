import { motion } from "framer-motion";
import { staggerChild } from "@/utils/motion";
import { skillGroups } from "@/constants";
import MetaLabel from "./ui/MetaLabel";
import { cn } from "@/utils/cn";

export default function StackGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
      {skillGroups.map((g, gi) => (
        <motion.div
          key={g.label}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            shown: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: gi * 0.12,
              },
            },
          }}
        >
          <MetaLabel className="mb-3" as="p">
            {g.label}
          </MetaLabel>
          <ul className="list-none m-0 p-0">
            {g.items.map((s, i) => (
              <motion.li
                key={s.name}
                variants={staggerChild({ side: "left", distance: 20 })}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "flex items-center gap-2.5 py-3 text-base cursor-default group",
                  i !== g.items.length - 1 && "border-b border-line-2"
                )}
              >
                <s.icon className="text-accent w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-[8deg]" />
                {s.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
