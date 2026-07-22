import { motion } from "framer-motion";
import { Eye, Star } from "lucide-react";
import { cn } from "@/utils/cn";
import type { BlogStats as Stats } from "@/utils/useBlogStats";

interface Props {
  variant: "top" | "bottom";
  stats: Stats | null;
  toggleStar: () => void;
  pending: boolean;
}

function Pills({ stats, toggleStar, pending }: Omit<Props, "variant">) {
  const starred = !!stats?.starred;
  return (
    <div className="flex items-center gap-2.5">
      <motion.button
        type="button"
        onClick={toggleStar}
        disabled={pending || !stats}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -1 }}
        aria-pressed={starred}
        aria-label={starred ? "Remove star" : "Star this post"}
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-sm font-medium transition-colors disabled:opacity-60",
          starred
            ? "border-accent text-accent bg-accent-soft"
            : "border-line text-ink-2 hover:text-ink hover:border-ink"
        )}
      >
        <motion.span
          key={starred ? "on" : "off"}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 520, damping: 14 }}
          className="inline-flex"
        >
          <Star className={cn("w-[18px] h-[18px]", starred && "fill-current")} />
        </motion.span>
        <span className="tabular-nums">{stats ? stats.stars : "–"}</span>
      </motion.button>

      <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-line text-sm text-ink-2">
        <Eye className="w-[18px] h-[18px]" />
        <span className="tabular-nums">{stats ? stats.views : "–"}</span>
      </span>
    </div>
  );
}

export default function BlogStats({ variant, ...rest }: Props) {
  if (variant === "bottom") {
    return (
      <div className="max-w-page mx-auto px-5 md:px-10">
        <div className="max-w-[680px] mx-auto flex flex-col items-center gap-4 py-14 border-t border-line">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Enjoyed this?
          </p>
          <Pills {...rest} />
        </div>
      </div>
    );
  }

  return <Pills {...rest} />;
}
