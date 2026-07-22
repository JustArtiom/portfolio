import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogs } from "@/constants";
import { motionProps } from "@/utils/motion";

// Most recent blog entry.
const latest = Object.entries(blogs).sort(([, a], [, b]) =>
  a.date < b.date ? 1 : -1
)[0];

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function FeaturedPost() {
  if (!latest) return null;
  const [slug, post] = latest;

  return (
    <section className="max-w-page mx-auto px-5 md:px-10 pb-20 md:pb-28">
      <motion.div {...motionProps({ side: "bottom", distance: 24 })}>
        <Link
          to={`/blog/${slug}`}
          className="group grid grid-cols-1 md:grid-cols-[300px_1fr] rounded-lg border border-line overflow-hidden hover:border-ink transition-colors"
        >
          <div className="bg-white overflow-hidden aspect-[16/9] md:aspect-auto md:h-full">
            <img
              src={post.banner}
              alt=""
              loading="lazy"
              className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent inline-block"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Latest write-up
              <span className="text-faint">·</span>
              <span className="text-faint normal-case tracking-normal">
                {monthYear(post.date)}
              </span>
            </span>

            <h3 className="text-[22px] md:text-[27px] leading-tight tracking-[-0.02em] font-medium text-balance transition-colors group-hover:text-accent">
              {post.title}
            </h3>

            <p className="text-ink-2 max-w-[60ch] text-pretty line-clamp-2">
              {post.description}
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm font-medium mt-1">
              Read the post
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
