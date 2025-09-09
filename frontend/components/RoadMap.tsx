import { roadmap } from "@/constants";
import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { motion, useScroll, useTransform } from "framer-motion";
import { motionProps } from "@/utils/motion";
import { MapPin, Home, Clock } from "lucide-react";
import pms from "pretty-ms";
import dateFormat from "dateformat";
import SkillList from "./SkillList";
import ServiceList from "./ServiceList";
import { useRef } from "react";
import Branch from "@/assets/svg/branch.svg";
import { cn } from "@/utils/cn";

export default function RoadMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);

  return (
    <div ref={sectionRef} className="cursor-default w-full relative py-20">
      <motion.div
        className="absolute bg-gradient-to-b from-transparent via-accent/10 to-transparent w-[5px] h-full top-0 left-1/2 -translate-x-1/2 z-40"
        style={{ height }}
      >
        <div
          className="absolute top-0 bg-gradient-to-b from-transparent via-accent/50 to-transparent to-95% w-[1px] left-1/2 -translate-x-1/2"
          style={{ height: "100%" }}
        />
      </motion.div>
      <SectionTitle title="Road Map" />
      <article className="pt-30">
        {[...roadmap].reverse().map((item, index) => {
          const time = item.to
            ? pms((item.to.getTime() || Date.now()) - item.from.getTime(), {
                compact: true,
                verbose: true,
              })
            : null;
          return (
            <div key={index} className="relative">
              <motion.div
                className="absolute left-1/2 -top-15 md:-top-10 -translate-x-1/2 p-2"
                {...motionProps({ side: "bottom" })}
              >
                <div className="absolute w-5 h-5 -left-[32px] -top-[5px] shadow-accent shadow-[50px_15px_40px_rgba(0,0,0,0.1)]"></div>
                <p className="text-xl">
                  {item.to
                    ? new Date(item.to).getFullYear()
                    : new Date().getFullYear()}
                </p>
              </motion.div>
              <motion.div
                className={cn(
                  "absolute md:z-40 left-1/2 top-[20%] -translate-y-1/2 -translate-x-full md:block hidden",
                  index % 2 === 0 ? "-translate-x-full" : "translate-x-0"
                )}
                {...motionProps({ side: "bottom" })}
              >
                <Branch
                  className={cn(
                    "text-accent w-25",
                    index % 2 === 1 && "scale-x-[-1]"
                  )}
                />
              </motion.div>
              <motion.div
                className={cn("w-full z-50 flex mt-20 md:-mt-30 relative", {
                  "justify-end": index % 2 === 1,
                  "mt-0": index === 0,
                })}
                key={index}
                {...motionProps({ side: index % 2 === 0 ? "left" : "right" })}
              >
                <Card className="py-4 w-full md:w-5/12 transition-transform hover:scale-[1.01] overflow-hidden z-40">
                  <div className="flex mb-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h1 className="text-lg font-semibold mb-0">
                          {item.title}
                        </h1>
                        {item.achieved && (
                          <p className="text-muted">
                            {item.achieved.join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.company?.name && (
                          <a
                            href={item?.company?.website}
                            className="flex gap-2 items-center text-muted underline"
                          >
                            <Home className="h-5 text-accent" />{" "}
                            {item.company.name}
                          </a>
                        )}
                        {item.location && (
                          <p className="flex gap-2 items-center text-muted">
                            <MapPin className="h-5 text-accent" />{" "}
                            {item.location}
                          </p>
                        )}
                        {(time || (!item.to && item.from)) && (
                          <p className="flex gap-2 items-center text-muted">
                            <Clock className="h-5 text-accent" />
                            {time ||
                              `From ${dateFormat(item.from, "mmmm dS, yyyy")} to today`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="h-15 flex items-center">
                      {item.company?.logo && (
                        <img
                          src={item.company.logo}
                          alt={item.company.name}
                          className="max-h-15 max-w-20"
                        />
                      )}
                    </div>
                  </div>
                  {item.skills && (
                    <div className="mb-4">
                      <SkillList skills={item.skills} size="sm" />
                    </div>
                  )}
                  {item.learned && (
                    <div className="mb-4">
                      <ServiceList services={item.learned} />
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          );
        })}
      </article>
    </div>
  );
}
