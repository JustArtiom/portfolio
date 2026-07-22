import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogs, type BlogSlug } from "@/constants";
import { getBlogContent } from "./blogs";
import BlogStats from "@/components/BlogStats";
import { useBlogStats } from "@/utils/useBlogStats";

export default function BlogPost() {
  const { slug } = useParams();
  const Content = getBlogContent(slug);
  const meta = slug && slug in blogs ? blogs[slug as BlogSlug] : undefined;
  // One hook instance for the whole post (so a view counts once), shared by the
  // top and bottom stat bars.
  const stats = useBlogStats(Content && slug ? slug : undefined);

  useEffect(() => {
    document.title = meta ? `${meta.title} — Artiom` : "Artiom";
    return () => {
      document.title = "Artiom";
    };
  }, [meta]);

  return (
    <div className="relative">
      <div className="max-w-page mx-auto px-5 md:px-10 pt-2">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors"
          >
            ← Back to blog
          </Link>
          {Content && slug && <BlogStats variant="top" {...stats} />}
        </div>
      </div>

      {Content ? (
        <Content />
      ) : (
        <div className="max-w-page mx-auto px-5 md:px-10 pt-10 min-h-[60vh]">
          <p className="font-mono text-sm text-muted">
            {"// this post isn't published yet."}
          </p>
        </div>
      )}

      {Content && slug && <BlogStats variant="bottom" {...stats} />}
    </div>
  );
}
