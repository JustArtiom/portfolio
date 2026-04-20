import { useState } from "react";
import { motion } from "framer-motion";
import Chip from "./ui/Chip";
import MetaLabel from "./ui/MetaLabel";
import type { Project } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-3 md:gap-6 px-4 md:px-6 py-7 md:py-9 border-t border-line relative rounded-xl transition-colors last:border-b overflow-hidden"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-linear-to-r from-[color-mix(in_oklab,var(--color-accent)_8%,transparent)] from-0% to-transparent to-70%"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        aria-hidden
        className="absolute left-0 top-1/2 w-[3px] bg-accent rounded-r"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: hover ? "60%" : 0,
          opacity: hover ? 1 : 0,
          y: "-50%",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      <div className="pt-1.5 flex md:flex-col gap-2 md:gap-1 items-baseline md:items-start relative">
        <motion.span
          className="text-sm text-ink font-medium font-mono"
          animate={{
            color: hover ? "var(--color-accent)" : "var(--color-ink)",
          }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.span>
        <MetaLabel>{project.year}</MetaLabel>
        <span className="md:hidden text-faint">·</span>
        <MetaLabel className="md:hidden">{project.kind}</MetaLabel>
      </div>

      <div className="max-w-[720px] relative">
        <div className="flex justify-between items-baseline gap-4 mb-1">
          <h3 className="text-[26px] md:text-[32px] tracking-tight leading-[1.1] m-0 font-medium flex items-baseline gap-3.5">
            <motion.span
              animate={{ x: hover ? 4 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {project.name}
            </motion.span>
            {project.src && (
              <motion.a
                href={project.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Source for ${project.name}`}
                animate={{
                  x: hover ? 3 : 0,
                  y: hover ? -3 : 0,
                  color: hover
                    ? "var(--color-accent)"
                    : "var(--color-muted)",
                }}
                transition={{ duration: 0.3 }}
                className="text-lg inline-block"
              >
                ↗
              </motion.a>
            )}
          </h3>
          <MetaLabel className="hidden md:inline">{project.kind}</MetaLabel>
        </div>

        <p className="text-lg text-accent font-light tracking-[-0.02em] my-2 mb-3 dark:text-[color-mix(in_oklab,var(--color-accent)_88%,white)]">
          {project.tagline}
        </p>

        <p className="text-base text-ink-2 m-0 mb-5 max-w-[60ch] text-pretty">
          {project.description}
        </p>

        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {project.skills.map((s, i) => (
              <Chip
                key={s.name}
                icon={s.icon}
                variant="mono"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05 + i * 0.04,
                }}
              >
                {s.name}
              </Chip>
            ))}
          </div>

          {project.download && project.download.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <MetaLabel>Download</MetaLabel>
              {project.download.map((d) => (
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
