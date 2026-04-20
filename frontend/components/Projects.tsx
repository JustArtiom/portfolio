import Section from "./ui/Section";
import ProjectCard from "./ProjectCard";
import { projects } from "@/constants";

export default function Projects() {
  return (
    <Section
      id="projects"
      num="03"
      title="Selected work"
      sub="A mix of shipped apps, open-source tools, and client work. The through-line: small scope, real utility, code I'm not embarrassed to show."
    >
      <div className="md:pl-[84px] -mx-4 md:-mx-6 flex flex-col">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
