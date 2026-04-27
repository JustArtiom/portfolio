import { motion } from "framer-motion";
import { staggerChild, staggerOnMount } from "@/utils/motion";
import { ButtonLink } from "./ui/Button";

export default function Hero() {
  return (
    <motion.section
      aria-label="Introduction"
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
        London · Open to freelance work
      </motion.p>

      <motion.h1
        variants={staggerChild({ side: "bottom", distance: 30 })}
        className="prose-em text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.035em] font-medium my-10 max-w-[15ch] text-balance"
      >
        Hi, I&rsquo;m <em>Artiom.</em>
        <br />
        I build <span className="text-accent">useful things</span>
        <br />
        Web, Mobile, Automations, AI.
      </motion.h1>

      <motion.p
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="max-w-[58ch] text-xl leading-[1.55] text-ink-2 mb-12 text-pretty"
      >
        Full-stack developer based in London. I focus on small, clear
        software that gets out of your way. ~ Brings ideas to reality ~
      </motion.p>

      <motion.div
        variants={staggerChild({ side: "bottom", distance: 20 })}
        className="flex flex-wrap gap-3"
      >
        <ButtonLink href="#projects" arrow>
          See my work
        </ButtonLink>
        <ButtonLink href="#contact" variant="ghost">
          Get in touch
        </ButtonLink>
      </motion.div>
    </motion.section>
  );
}
