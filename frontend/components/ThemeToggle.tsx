import { motion, useAnimationControls } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/cn";

type Props = {
  theme: "light" | "dark";
  onToggle: () => void;
  className?: string;
};

export default function ThemeToggle({ theme, onToggle, className }: Props) {
  // Spin only on click. The icon itself is picked by CSS (`dark:`), so it's
  // right from first paint and doesn't animate when the theme syncs on load.
  const iconControls = useAnimationControls();

  const handleClick = () => {
    onToggle();
    void iconControls.start({
      rotate: [-90, 0],
      opacity: [0, 1],
      transition: { duration: 0.3 },
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: -30 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "w-9 h-9 rounded-full border border-line bg-bg-2 text-ink inline-flex items-center justify-center transition-colors hover:border-ink hover:text-accent overflow-hidden",
        className
      )}
    >
      <motion.span animate={iconControls} className="inline-flex">
        <Sun className="w-4 h-4 dark:hidden" />
        <Moon className="w-4 h-4 hidden dark:block" />
      </motion.span>
    </motion.button>
  );
}
