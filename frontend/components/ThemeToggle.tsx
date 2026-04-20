import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/cn";

type Props = {
  theme: "light" | "dark";
  onToggle: () => void;
  className?: string;
};

export default function ThemeToggle({ theme, onToggle, className }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: -30 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "w-9 h-9 rounded-full border border-line bg-bg-2 text-ink inline-flex items-center justify-center transition-colors hover:border-ink hover:text-accent overflow-hidden",
        className
      )}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-flex"
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </motion.span>
    </motion.button>
  );
}
