import type { Skill } from "@/constants";
import { cn } from "@/utils/cn";
import { motionProps } from "@/utils/motion";
import { motion } from "framer-motion";

interface SkillListProps {
  skills: Skill[];
  size?: "sm" | "md" | "lg";
}

export default function SkillList({ skills, size = "md" }: SkillListProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap",
        size === "sm" && "gap-1",
        size === "md" && "gap-2",
        size === "lg" && "gap-3"
      )}
    >
      {skills.map((item, index) => (
        <motion.li
          key={index}
          className={cn(
            "inline-flex items-center gap-2 p-1 px-4 rounded-full text-gray-700 dark:text-gray-300 bg-accent-200/8 hover:bg-accent-200/20 transition-colors group hover:text-primary",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg"
          )}
          {...motionProps({
            side: "bottom",
            distance: 10,
            delay: 0.1 * index,
            transition: { duration: 0.2 },
          })}
        >
          <item.icon className="text-accent/70 h-5 wiggle-md group-hover:text-accent" />
          {item.name}
        </motion.li>
      ))}
    </ul>
  );
}
