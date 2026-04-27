import Section from "./ui/Section";
import ProjectCard from "./ProjectCard";
import { projects } from "@/constants";

export default function Projects() {
  return (
    <Section
      id="projects"
      num="03"
      title="Selected work"
      sub="A mix of finished apps, open-source tools, and client work. All small in scope, genuinely useful, and built with care."
    >
      <div className="md:pl-[84px] -mx-4 md:-mx-6 flex flex-col">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
