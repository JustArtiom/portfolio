import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "./ui/Section";
import { skillGroups } from "@/constants";
import { reveal } from "@/utils/motion";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,60ch)_minmax(0,1fr)] gap-10 xl:gap-20">
        <motion.div {...reveal}>
          <p className="text-[22px] leading-normal text-ink tracking-[-0.01em] mb-5 text-pretty">
            I&rsquo;m a full-stack developer in London. I&rsquo;ve been
            shipping production software since I was 17, and since 2025
            I&rsquo;ve been at Wakeflow, building for their clients: a luxury
            travel platform, a language learning app and an AI assistant for
            financial advisers.
          </p>

          <p className="text-lg leading-[1.65] mb-5 text-pretty">
            Outside client work I like pulling things apart to see how they
            work. I reverse engineered{" "}
            <a href="#projects" className="prose-link">
              how Philips Hue bulbs talk over Bluetooth
            </a>
            , and I built the localization for{" "}
            <Link to="/blog/uhra-2026" className="prose-link">
              UH Racing&rsquo;s driverless Formula Student car
            </Link>
            .
          </p>

          <p className="text-lg leading-[1.65] text-muted m-0">
            I studied Computer Science at the University of Hertfordshire
            alongside work and finished in 2026.
          </p>
        </motion.div>

        <motion.dl
          {...reveal}
          className="m-0 grid gap-6 content-start border-t border-line pt-8 xl:border-t-0 xl:pt-1 xl:border-l xl:pl-10"
        >
          {skillGroups.map((g) => (
            <div key={g.label}>
              <dt className="text-sm text-muted mb-1">{g.label}</dt>
              <dd className="m-0 text-ink-2">
                {g.items.map((s, i) => (
                  <span key={s.name}>
                    <span className="whitespace-nowrap">
                      {s.name}
                      {i < g.items.length - 1 && ","}
                    </span>{" "}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
