import { Suspense } from "react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/BlogPost";
import { blogs, unlistedBlogs } from "@/constants";
import { pageMeta } from "@/seo";
import { getBlogContent } from "./blogs";
import BlogStats from "@/components/BlogStats";
import BlogLoader from "@/components/BlogLoader";
import { useBlogStats } from "@/utils/useBlogStats";

const postMeta: Record<string, { title: string; description: string }> = {
  ...blogs,
  ...unlistedBlogs,
};

export function meta({ params }: Route.MetaArgs) {
  const post = postMeta[params.slug];
  if (!post) return [{ title: "Not published yet — Artiom" }];
  return pageMeta({
    title: `${post.title} — Artiom`,
    description: post.description,
    path: `/blog/${params.slug}`,
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const Content = getBlogContent(slug);
  // One hook instance for the whole post (so a view counts once), shared by the
  // top and bottom stat bars.
  const stats = useBlogStats(Content && slug ? slug : undefined);

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
        <Suspense fallback={<BlogLoader />}>
          <Content />
        </Suspense>
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
