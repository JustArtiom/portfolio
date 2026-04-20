import { motion } from "framer-motion";
import Section from "./ui/Section";
import Strip from "./Strip";
import StackGrid from "./StackGrid";
import NowBlock from "./NowBlock";
import DetailList from "./DetailList";
import { services } from "@/constants";
import { staggerChild, staggerOnScroll } from "@/utils/motion";

export default function About() {
  return (
    <Section id="about" num="01" title="About">
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

          <NowBlock />
        </motion.div>

        <DetailList />
      </div>

      <Strip label="Services">
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
      </Strip>

      <Strip label="Stack">
        <StackGrid />
      </Strip>
    </Section>
  );
}
