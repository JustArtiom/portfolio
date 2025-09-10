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
  const height = useTransform(scrollYProgress, [0, 0.75], ["0%", "100%"]);
  let lastYear: number | null = null;

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
          const year = item.from
            ? new Date(item.from).getFullYear()
            : new Date().getFullYear();
          const showYear = year !== lastYear;
          if (showYear) lastYear = year;
          return (
            <div key={index} className="relative">
              {showYear && (
                <motion.div
                  className="absolute left-1/2 -top-15 md:-top-10 -translate-x-1/2 p-2"
                  {...motionProps({ side: "bottom" })}
                >
                  <div className="absolute w-[20px] h-[20px] -left-[60px] -top-[5px] shadow-accent shadow-[80px_15px_40px_rgba(0,0,0,0.1)]"></div>
                  <p className="text-xl">{year}</p>
                </motion.div>
              )}
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
                className={cn(
                  "w-full md:w-5/12 z-50 flex mt-20 md:-mt-15 relative",
                  {
                    "justify-end": index % 2 === 1,
                    "mt-0": index === 0,
                    "ml-auto": index % 2 === 1,
                  }
                )}
                key={index}
                {...motionProps({ side: index % 2 === 0 ? "left" : "right" })}
              >
                <Card
                  size="lg"
                  rounded="xl"
                  className="w-full transition-transform hover:scale-[1.01] overflow-hidden z-[40] flex flex-col gap-6"
                >
                  <div className="flex">
                    <div className="flex-1">
                      <div className="mb-5">
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
                            <p>
                              {dateFormat(item.from, "mmm yyyy")} -{" "}
                              {item.to
                                ? dateFormat(item.to, "mmm yyyy")
                                : "Present"}{" "}
                              {time && (
                                <span className="text-sm">({time})</span>
                              )}
                            </p>
                          </p>
                        )}
                      </div>
                    </div>
                    {item.company?.logo && (
                      <div className="h-15 flex items-center pl-4">
                        <img
                          src={item.company.logo}
                          alt={item.company.name}
                          className="max-h-15 max-w-20"
                        />
                      </div>
                    )}
                  </div>
                  {item.skills && (
                    <div>
                      <SkillList skills={item.skills} size="sm" />
                    </div>
                  )}
                  {item.learned && (
                    <div>
                      <ServiceList services={item.learned} />
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          );
        })}
      </article>
      <motion.p
        className="text-center font-mono dark:text-gray-400 text-gray-600 mt-20"
        {...motionProps({ side: "bottom" })}
      >
        Down To My First
        <br />
        <span className="text-accent font-bold">Hello world</span>
      </motion.p>
    </div>
  );
}
