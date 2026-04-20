import dateFormat from "dateformat";
import { motion } from "framer-motion";
import Chip from "./ui/Chip";
import { cn } from "@/utils/cn";
import type { RoadmapItem } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: RoadmapItem;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      className="grid grid-cols-[24px_1fr] md:grid-cols-[40px_1fr] gap-4 md:gap-6 pb-14 relative"
    >
      <div className="flex flex-col items-center pt-1.5">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05 + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
          className={cn(
            "w-3 h-3 rounded-full border-2 shrink-0 relative z-10",
            item.active
              ? "bg-accent border-accent shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
              : "bg-bg border-ink"
          )}
        />
        {!isLast && <span className="flex-1 w-px bg-line mt-2 min-h-[30px]" />}
      </div>

      <div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2 flex gap-2.5 items-baseline flex-wrap">
          <span>
            {dateFormat(item.from, "mmm yyyy")} —{" "}
            {item.to ? dateFormat(item.to, "mmm yyyy") : "Present"}
          </span>
          <span className="text-faint">·</span>
          <span>{item.location}</span>
        </div>

        <h3 className="text-2xl tracking-[-0.015em] m-0 mb-3.5 font-medium flex flex-wrap gap-x-2 items-baseline">
          {item.title}
          {item.company && (
            <span className="inline-flex items-baseline gap-2">
              <span className="text-muted font-normal">at</span>
              {item.company.website ? (
                <a
                  href={item.company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="prose-link"
                >
                  {item.company.name}
                </a>
              ) : (
                <span>{item.company.name}</span>
              )}
            </span>
          )}
        </h3>

        {item.learned && item.learned.length > 0 && (
          <motion.ul
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              shown: {
                transition: { staggerChildren: 0.06, delayChildren: 0.2 },
              },
            }}
            className="list-none m-0 mb-3.5 p-0"
          >
            {item.learned.map((b, j) => (
              <motion.li
                key={j}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  shown: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                className="relative pl-5 py-0.5 text-base text-ink-2"
              >
                <span className="absolute left-0 text-faint">—</span>
                {b}
              </motion.li>
            ))}
          </motion.ul>
        )}

        {item.skills && item.skills.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.04 } },
            }}
            className="flex gap-1.5 flex-wrap"
          >
            {item.skills.map((s) => (
              <Chip
                key={s.name}
                icon={s.icon}
                variant="mono"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  shown: { opacity: 1, scale: 1 },
                }}
              >
                {s.name}
              </Chip>
            ))}
          </motion.div>
        )}

        {item.achieved && item.achieved.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-2">
            {item.achieved.map((a) => (
              <Chip
                key={a}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                {a}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}
