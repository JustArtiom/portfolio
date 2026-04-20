import { useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { projects, type Project } from "@/constants";

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const [hover, setHover] = useState(false);
  const num = String(idx + 1).padStart(2, "0");

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: idx * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-3 md:gap-6 px-4 md:px-6 py-7 md:py-9 border-t border-line relative rounded-xl transition-colors last:border-b overflow-hidden"
    >
      {/* Hover gradient backdrop */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-accent)_8%,transparent)_0%,transparent_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Left accent rail on hover */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-1/2 w-[3px] bg-accent rounded-r"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: hover ? "60%" : 0,
          opacity: hover ? 1 : 0,
          y: "-50%",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="font-mono text-[11px] text-muted uppercase tracking-wider pt-1.5 flex md:flex-col gap-2 md:gap-1 items-baseline md:items-start relative">
        <motion.span
          className="text-sm text-ink font-medium"
          animate={{ color: hover ? "var(--color-accent)" : "var(--color-ink)" }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.span>
        <span>{p.year}</span>
        <span className="md:hidden text-faint">·</span>
        <span className="md:hidden">{p.kind}</span>
      </div>

      <div className="max-w-[720px] relative">
        <div className="flex justify-between items-baseline gap-4 mb-1">
          <h3 className="text-[26px] md:text-[32px] tracking-tight leading-[1.1] m-0 font-medium flex items-baseline gap-3.5">
            <motion.span
              animate={{ x: hover ? 4 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {p.name}
            </motion.span>
            {p.src && (
              <motion.a
                href={p.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Source for ${p.name}`}
                animate={{
                  x: hover ? 3 : 0,
                  y: hover ? -3 : 0,
                  color: hover ? "var(--color-accent)" : "var(--color-muted)",
                  rotate: hover ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="text-lg inline-block"
              >
                ↗
              </motion.a>
            )}
          </h3>
          <span className="hidden md:inline font-mono text-[11px] text-muted uppercase tracking-wider">
            {p.kind}
          </span>
        </div>

        <p className="text-lg text-accent font-light tracking-[-0.02em] my-2 mb-3 dark:text-[color-mix(in_oklab,var(--color-accent)_88%,white)]">
          {p.tagline}
        </p>

        <p className="text-base text-ink-2 m-0 mb-5 max-w-[60ch] text-pretty">
          {p.description}
        </p>

        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {p.skills.map((s, i) => (
              <motion.span
                key={s.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 + i * 0.04 }}
                whileHover={{ y: -2, borderColor: "var(--color-accent)" }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-line rounded-full text-[11px] font-mono text-ink-2 bg-bg cursor-default"
              >
                <s.icon className="w-3 h-3 text-accent" />
                {s.name}
              </motion.span>
            ))}
          </div>

          {p.download && p.download.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
                Download
              </span>
              {p.download.map((d) => (
                <motion.a
                  key={d.platform}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-mono text-[11px] px-2.5 py-1 border border-line rounded-full transition-colors hover:border-accent hover:text-accent"
                >
                  {d.platform}
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-page mx-auto px-5 md:px-10 pt-[134px] pb-24 scroll-mt-[100px]"
    >
      <SectionHead
        num="03"
        title="Selected work"
        sub="A mix of shipped apps, open-source tools, and client work. The through-line: small scope, real utility, code I'm not embarrassed to show."
      />

      <div className="md:pl-[84px] -mx-4 md:-mx-6 flex flex-col">
        {projects.map((p, i) => (
          <ProjectCard p={p} idx={i} key={p.name} />
        ))}
      </div>
    </section>
  );
}
