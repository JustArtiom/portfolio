import { motionProps } from "@/utils/motion";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ServiceList({ services }: { services: string[] }) {
  return (
    <ul className="list-none flex flex-col gap-2">
      {services.map((item, index) => (
        <motion.li
          key={index}
          className="inline-flex items-center gap-4 group"
          {...motionProps({
            side: "right",
            distance: 80,
            delay: 0.1 * index,
          })}
        >
          <div className="w-4">
            <ArrowUp className="text-accent h-4 group-hover:animate-bounce rotate-90" />
          </div>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
