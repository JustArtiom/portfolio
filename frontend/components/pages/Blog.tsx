import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogs } from "@/constants";
import { getBlogContent } from "./blogs";
import { staggerChild, staggerOnMount } from "@/utils/motion";
import { useBlogStatsMap } from "@/utils/useBlogStats";
import StatBadge from "@/components/StatBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const entries = Object.entries(blogs).sort(([, a], [, b]) =>
  a.date < b.date ? 1 : -1
);
const slugs = entries.map(([slug]) => slug);

export default function Blog() {
  const statsMap = useBlogStatsMap(slugs);

  return (
    <motion.section
      className="max-w-page mx-auto px-5 md:px-10 pt-20 pb-24"
      {...staggerOnMount(0.1, 0.05)}
    >
      <motion.p
        variants={staggerChild({ side: "bottom", distance: 16 })}
        className="font-mono text-xs tracking-wider text-muted uppercase mb-4"
      >
        Writing
      </motion.p>

      <motion.h1
        variants={staggerChild({ side: "bottom", distance: 24 })}
        className="text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.03em] font-medium mb-5"
      >
        Blog
      </motion.h1>

      <motion.p
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="text-lg text-muted max-w-[58ch] mb-16 text-pretty"
      >
        Notes and write-ups on things I&rsquo;ve built, broken, or changed my
        mind on.
      </motion.p>

      <ul className="list-none m-0 p-0 flex flex-col">
        {entries.map(([slug, post]) => {
          const ready = Boolean(getBlogContent(slug));

          const inner = (
            <>
              <div className="w-full sm:w-80 shrink-0 aspect-[16/10] rounded-glass overflow-hidden bg-white border border-line">
                <img
                  src={post.banner}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 font-mono text-xs text-muted mb-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {ready && statsMap[slug] && (
                    <>
                      <span className="text-faint">·</span>
                      <StatBadge stats={statsMap[slug]} />
                    </>
                  )}
                  {!ready && (
                    <>
                      <span className="text-faint">·</span>
                      <span className="text-faint">coming soon</span>
                    </>
                  )}
                </div>

                <h2
                  className={
                    "text-[24px] md:text-[28px] leading-tight tracking-[-0.02em] font-medium mb-2 transition-colors" +
                    (ready ? " group-hover:text-accent" : "")
                  }
                >
                  {post.title}
                </h2>

                <p className="text-ink-2 max-w-[62ch] text-pretty">
                  {post.description}
                </p>
              </div>
            </>
          );

          return (
            <motion.li
              key={slug}
              variants={staggerChild({ side: "bottom", distance: 20 })}
              className="border-t border-line last:border-b"
            >
              {ready ? (
                <Link
                  to={`/blog/${slug}`}
                  className="group flex flex-col sm:flex-row gap-5 py-8"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-5 py-8 opacity-60 cursor-default">
                  {inner}
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
