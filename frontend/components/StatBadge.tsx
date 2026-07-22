import { Eye, Star } from "lucide-react";
import { cn } from "@/utils/cn";
import type { StatCounts } from "@/utils/useBlogStats";

/** Compact, read-only stars + views badge for blog cards. */
export default function StatBadge({
  stats,
  className,
}: {
  stats?: StatCounts;
  className?: string;
}) {
  if (!stats) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs text-muted tabular-nums",
        className
      )}
    >
      <span className="inline-flex items-center gap-1">
        <Star className="w-3.5 h-3.5" />
        {stats.stars}
      </span>
      <span className="inline-flex items-center gap-1">
        <Eye className="w-3.5 h-3.5" />
        {stats.views}
      </span>
    </span>
  );
}
