import Section from "./ui/Section";
import ProjectCard from "./ProjectCard";
import { projects } from "@/constants";

export default function Projects() {
  return (
    <Section id="projects" title="Side projects">
      <div className="-mx-4 md:-mx-6 flex flex-col">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </Section>
  );
}
