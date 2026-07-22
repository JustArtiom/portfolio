import { Eye, Star } from "lucide-react";
import { cn } from "@/utils/cn";
import { useBlogStats } from "@/utils/useBlogStats";

export default function BlogStats({ slug }: { slug: string }) {
  const { stats, toggleStar, pending } = useBlogStats(slug);

  return (
    <div className="max-w-page mx-auto px-5 md:px-10">
      <div className="max-w-[680px] mx-auto flex items-center justify-center gap-4 py-12 border-t border-line">
        <button
          type="button"
          onClick={toggleStar}
          disabled={pending || !stats}
          aria-pressed={!!stats?.starred}
          aria-label={stats?.starred ? "Remove star" : "Star this post"}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors disabled:opacity-60",
            stats?.starred
              ? "border-accent text-accent bg-accent-soft"
              : "border-line text-ink-2 hover:border-ink hover:text-ink"
          )}
        >
          <Star
            className={cn("w-4 h-4", stats?.starred && "fill-current")}
          />
          <span className="tabular-nums">{stats ? stats.stars : "–"}</span>
        </button>

        <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <Eye className="w-4 h-4" />
          <span className="tabular-nums">{stats ? stats.views : "–"}</span>
          views
        </span>
      </div>
    </div>
  );
}
