import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import { reveal } from "@/utils/motion";

export default function Hero() {
  return (
    <motion.section
      {...reveal}
      aria-label="Introduction"
      className="max-w-page mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-14 md:pb-20"
    >
      <h1 className="text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.035em] font-medium mb-10 max-w-[15ch] text-balance">
        Hi, I&rsquo;m Artiom.
        <br />
        I build <span className="text-accent">useful things</span>
        <br />
        Web, Mobile, Automations, AI.
      </h1>

      <p className="max-w-[58ch] text-xl leading-[1.55] text-ink-2 mb-12 text-pretty">
        Full-stack developer based in London. I focus on small, clear
        software that gets out of your way. ~ Brings ideas to reality ~
      </p>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="#work" arrow>
          See my experience
        </ButtonLink>
        <ButtonLink href="#contact" variant="ghost">
          Get in touch
        </ButtonLink>
      </div>
    </motion.section>
  );
}
