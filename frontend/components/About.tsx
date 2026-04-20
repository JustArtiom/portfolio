import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { details, nowDoing, services, skillGroups } from "@/constants";
import {
  motionProps,
  staggerChild,
  staggerOnScroll,
} from "@/utils/motion";

export default function About() {
  return (
    <section
      id="about"
      className="max-w-page mx-auto px-5 md:px-10 pt-[134px] pb-24 scroll-mt-[100px]"
    >
      <SectionHead num="01" title="About" />

      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 md:gap-16 md:pl-[84px] mb-16">
        <motion.div {...staggerOnScroll(0.1)}>
          <motion.p
            variants={staggerChild({ side: "bottom", distance: 20 })}
            className="text-[22px] leading-normal text-ink tracking-[-0.01em] mb-5 text-pretty"
          >
            I started writing code at sixteen because I wanted to bend software
            to my will. What began as a hobby turned into a craft, and then a
            career — I&rsquo;ve been shipping for over three years now,
            starting with open-source and third-party work, then in-house at{" "}
            <a
              href="https://danbot.host"
              target="_blank"
              rel="noreferrer"
              className="prose-link"
            >
              DanBot Hosting
            </a>
            , and now as a mid-level full-stack dev at{" "}
            <a
              href="https://wakeflow.io"
              target="_blank"
              rel="noreferrer"
              className="prose-link"
            >
              Wakeflow
            </a>
            .
          </motion.p>

          <motion.p
            variants={staggerChild({ side: "bottom", distance: 20 })}
            className="text-lg leading-[1.65] mb-5"
          >
            I like the parts of this job that most people don&rsquo;t — reading
            stack traces, untangling legacy behaviour, designing the boring
            bits so the rest can be interesting. I care about things that feel
            fast, don&rsquo;t break, and don&rsquo;t waste the user&rsquo;s
            time.
          </motion.p>

          <motion.p
            variants={staggerChild({ side: "bottom", distance: 20 })}
            className="text-lg leading-[1.65] text-muted mb-5"
          >
            Currently studying Computer Science at the University of
            Hertfordshire, alongside work.
          </motion.p>

          <motion.div
            variants={staggerChild({ side: "bottom", distance: 24 })}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
            className="relative mt-9 p-5 border border-line rounded-xl glass overflow-hidden"
          >
            <motion.span
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.17_145)] animate-now-breath inline-block" />
              <span>Right now</span>
            </div>
            <motion.ul
              {...staggerOnScroll(0.06)}
              className="grid gap-1.5 list-none m-0 p-0"
            >
              {nowDoing.map((n) => (
                <motion.li
                  key={n.key}
                  variants={staggerChild({ side: "left", distance: 20 })}
                  className="text-[15px] text-ink-2"
                >
                  <span className="inline-block min-w-[82px] font-mono text-[11px] uppercase tracking-wider text-muted pr-2">
                    {n.key}
                  </span>
                  {n.text}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        <motion.aside {...motionProps({ side: "right", distance: 40 })}>
          <dl className="m-0 p-6 border border-line rounded-xl glass">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className={
                  "flex justify-between gap-4 py-2.5 border-b border-dashed border-line " +
                  (i === 0 ? "pt-0 " : "") +
                  (i === details.length - 1 ? "border-b-0 pb-0" : "")
                }
              >
                <dt className="m-0 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {d.label}
                </dt>
                <dd className="m-0 text-sm text-right text-ink">{d.text}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.aside>
      </div>

      {/* Services strip */}
      <motion.div
        {...motionProps({ side: "bottom", distance: 24 })}
        className="md:pl-[84px] pt-8 pb-4 border-t border-dashed border-line grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8 items-baseline mb-2"
      >
        <div className="font-mono text-[11px] tracking-wider uppercase text-muted">
          Services
        </div>
        <motion.ul
          {...staggerOnScroll(0.06)}
          className="list-none m-0 p-0 flex flex-wrap gap-y-2.5 gap-x-7 text-ink-2"
        >
          {services.map((s, i) => (
            <motion.li
              key={s}
              variants={staggerChild({ side: "bottom", distance: 16 })}
              className="flex items-center gap-7"
            >
              {i > 0 && <span className="text-faint -mr-3.5">·</span>}
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Stack strip */}
      <motion.div
        {...motionProps({ side: "bottom", distance: 24 })}
        className="md:pl-[84px] pt-8 pb-4 border-t border-dashed border-line grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8 items-baseline"
      >
        <div className="font-mono text-[11px] tracking-wider uppercase text-muted">
          Stack
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                shown: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: gi * 0.12,
                  },
                },
              }}
            >
              <p className="font-mono text-[11px] text-muted uppercase tracking-wider mb-3">
                {g.label}
              </p>
              <ul className="list-none m-0 p-0">
                {g.items.map((s, i) => (
                  <motion.li
                    key={s.name}
                    variants={staggerChild({ side: "left", distance: 20 })}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                    className={
                      "flex items-center gap-2.5 py-3 text-base cursor-default group " +
                      (i === g.items.length - 1
                        ? ""
                        : "border-b border-line-2")
                    }
                  >
                    <s.icon className="text-accent w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-[8deg]" />
                    {s.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
