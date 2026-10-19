import Section from "./ui/Section";
import TimelineItem from "./TimelineItem";
import { roadmap } from "@/constants";

export default function Work() {
  return (
    <Section id="work" title="Experience">
      <ol className="list-none m-0 p-0">
        {roadmap.map((r, i) => (
          <TimelineItem
            key={i}
            item={r}
            isLast={i === roadmap.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
