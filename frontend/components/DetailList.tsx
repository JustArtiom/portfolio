import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { motionProps } from "@/utils/motion";
import { details } from "@/constants";
import Card from "./ui/Card";
import MetaLabel from "./ui/MetaLabel";

export default function DetailList() {
  return (
    <motion.aside {...motionProps({ side: "right", distance: 40 })}>
      <Card as="div" padding="lg">
        <dl className="m-0">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className={cn(
                "flex justify-between gap-4 py-2.5 border-b border-dashed border-line",
                i === 0 && "pt-0",
                i === details.length - 1 && "border-b-0 pb-0"
              )}
            >
              <MetaLabel as="dt">{d.label}</MetaLabel>
              <dd className="m-0 text-sm text-right text-ink">{d.text}</dd>
            </motion.div>
          ))}
        </dl>
      </Card>
    </motion.aside>
  );
}
