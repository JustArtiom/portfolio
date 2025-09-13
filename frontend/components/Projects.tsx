import { cn } from "@/utils/cn";
import Carousell from "./Carousell";
import SectionTitle from "./SectionTitle";
import { projects } from "@/constants";
import Card from "./Card";
import SkillList from "./SkillList";

export default function Projects() {
  return (
    <div className="py-30 min-h-[400px]">
      <SectionTitle title="Projects" />
      <div className="w-full h-[400px] my-30 hidden md:block">
        <Carousell items={projects}>
          {({ item, index, role, onClick, classes }) => (
            <Card
              key={index}
              className={cn(
                classes,
                role === "center" && "z-50",
                "relative w-8/12 aspect-video bg-center bg-cover bg-no-repeat"
              )}
              style={{
                backgroundImage: `url(${item.background.image})`,
              }}
              onClick={onClick}
            >
              <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-50% from-black to-transparent">
                <h2>{item.name}</h2>
                <p className="text-sm text-muted">{item.description}</p>
                {item.skills && (
                  <div className="mt-2">
                    <SkillList skills={item.skills} size="sm" />
                  </div>
                )}
              </div>
            </Card>
          )}
        </Carousell>
      </div>
      <div className="flex flex-col gap-10 md:hidden">
        {projects.map((item, index) => (
          <Card key={index} className="w-full relative">
            <div
              className="w-full aspect-video min-h-[300px] bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${item.background.image})`,
              }}
            />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-50% from-black to-transparent rounded-md">
              <h2>{item.name}</h2>
              <p className="text-sm text-muted">{item.description}</p>
              {item.skills && (
                <div className="mt-2">
                  <SkillList skills={item.skills} size="sm" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
