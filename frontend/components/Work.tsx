import { useRef } from "react";
import dateFormat from "dateformat";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHead from "./SectionHead";
import { roadmap } from "@/constants";
import { cn } from "@/utils/cn";

export default function Work() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="work"
      className="max-w-page mx-auto px-5 md:px-10 pt-[134px] pb-24 scroll-mt-[100px]"
    >
      <SectionHead num="02" title="Roadmap" />

      <ol ref={listRef} className="list-none m-0 p-0 md:pl-[84px] relative">
        {/* Scroll-linked progress line */}
        <motion.span
          aria-hidden
          className="absolute top-1.5 bottom-14 left-[11px] md:left-[calc(84px+19px)] w-px bg-linear-to-b from-accent via-accent to-accent/20 origin-top pointer-events-none"
          style={{ height: lineHeight }}
        />

        {roadmap.map((r, i) => {
          const last = i === roadmap.length - 1;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-[24px_1fr] md:grid-cols-[40px_1fr] gap-4 md:gap-6 pb-14 relative"
            >
              {/* Rail */}
              <div className="flex flex-col items-center pt-1.5">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05 + 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full border-2 shrink-0 relative z-10",
                    r.active
                      ? "bg-accent border-accent shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
                      : "bg-bg border-ink",
                  )}
                />
                {!last && (
                  <span className="flex-1 w-px bg-line mt-2 min-h-[30px]" />
                )}
              </div>

              {/* Body */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2 flex gap-2.5 items-baseline flex-wrap">
                  <span>
                    {dateFormat(r.from, "mmm yyyy")} —{" "}
                    {r.to ? dateFormat(r.to, "mmm yyyy") : "Present"}
                  </span>
                  <span className="text-faint">·</span>
                  <span>{r.location}</span>
                </div>

                <h3 className="text-2xl tracking-[-0.015em] m-0 mb-3.5 font-medium flex flex-wrap gap-x-2 items-baseline">
                  {r.title}
                  {r.company && (
                    <span className="inline-flex items-baseline gap-2">
                      <span className="text-muted font-normal">at</span>
                      {r.company.website ? (
                        <a
                          href={r.company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="prose-link"
                        >
                          {r.company.name}
                        </a>
                      ) : (
                        <span>{r.company.name}</span>
                      )}
                    </span>
                  )}
                </h3>

                {r.learned && r.learned.length > 0 && (
                  <motion.ul
                    initial="hidden"
                    whileInView="shown"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: {},
                      shown: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                    className="list-none m-0 mb-3.5 p-0"
                  >
                    {r.learned.map((b, j) => (
                      <motion.li
                        key={j}
                        variants={{
                          hidden: { opacity: 0, x: -16 },
                          shown: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.4 },
                          },
                        }}
                        className="relative pl-5 py-0.5 text-base text-ink-2"
                      >
                        <span className="absolute left-0 text-faint">—</span>
                        {b}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {r.skills && r.skills.length > 0 && (
                  <motion.div
                    initial="hidden"
                    whileInView="shown"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: {},
                      shown: { transition: { staggerChildren: 0.04 } },
                    }}
                    className="flex gap-1.5 flex-wrap"
                  >
                    {r.skills.map((s) => (
                      <motion.span
                        key={s.name}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          shown: { opacity: 1, scale: 1 },
                        }}
                        whileHover={{
                          y: -2,
                          borderColor: "var(--color-accent)",
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-line rounded-full text-xs text-ink-2 bg-bg font-mono cursor-default"
                      >
                        <s.icon className="w-3 h-3 text-accent" />
                        {s.name}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {r.achieved && r.achieved.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {r.achieved.map((a) => (
                      <motion.span
                        key={a}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        whileHover={{ y: -2 }}
                        className="inline-block px-2.5 py-0.5 border border-line rounded-full text-xs text-ink-2 bg-bg"
                      >
                        {a}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
