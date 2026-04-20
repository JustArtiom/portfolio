import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "./ui/Section";
import TimelineItem from "./TimelineItem";
import { roadmap } from "@/constants";

export default function Work() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="work" num="02" title="Roadmap">
      <ol ref={listRef} className="list-none m-0 p-0 md:pl-[84px] relative">
        <motion.span
          aria-hidden
          className="absolute top-1.5 bottom-14 left-[11px] md:left-[calc(84px+19px)] w-px bg-linear-to-b from-accent via-accent to-accent/20 origin-top pointer-events-none"
          style={{ height: lineHeight }}
        />
        {roadmap.map((r, i) => (
          <TimelineItem
            key={i}
            item={r}
            index={i}
            isLast={i === roadmap.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
