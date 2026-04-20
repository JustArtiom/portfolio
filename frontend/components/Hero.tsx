import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { yearsSince } from "@/utils/math";
import { site } from "@/constants";
import { staggerChild, staggerOnMount } from "@/utils/motion";

export default function Hero() {
  const [age, setAge] = useState(() => Math.floor(yearsSince(site.birthDate)));
  useEffect(() => {
    const id = setInterval(
      () => setAge(Math.floor(yearsSince(site.birthDate))),
      2000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="max-w-page mx-auto px-5 md:px-10 pt-20 pb-30"
      {...staggerOnMount(0.12, 0.1)}
    >
      <motion.p
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-line font-mono text-xs text-muted tracking-wider uppercase"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-accent inline-block"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        London · Available for select projects
      </motion.p>

      <motion.h1
        variants={staggerChild({ side: "bottom", distance: 30 })}
        className="prose-em text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.035em] font-medium my-10 max-w-[15ch] text-balance"
      >
        Hi, I&rsquo;m <em>Artiom.</em>
        <br />
        I build{" "}
        <span className="relative inline-block text-accent">
          useful things
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 bottom-1 h-[3px] bg-accent/40 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
        <br />
        on the web.
      </motion.h1>

      <motion.p
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="max-w-[58ch] text-xl leading-[1.55] text-ink-2 mb-12 text-pretty"
      >
        Full-stack developer, {age} years old, writing JavaScript since I was
        sixteen. Currently shipping at{" "}
        <a
          href="https://wakeflow.io"
          target="_blank"
          rel="noreferrer"
          className="prose-link"
        >
          Wakeflow
        </a>{" "}
        — open to freelance on the side.
      </motion.p>

      <motion.div
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="flex flex-wrap gap-3"
      >
        <motion.a
          href="#projects"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2.5 px-5.5 py-3.5 rounded-full bg-ink text-bg text-[15px] border border-transparent transition-colors hover:bg-accent dark:hover:text-white"
        >
          See the work
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-5.5 py-3.5 rounded-full border border-line text-ink text-[15px] transition-colors hover:border-ink"
        >
          Get in touch
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
