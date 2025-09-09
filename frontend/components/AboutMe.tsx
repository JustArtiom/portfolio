import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { details, services, skills } from "@/constants";
import Button from "./Button";
import { motionProps } from "@/utils/motion";
import SectionTitle from "./SectionTitle";

export default function AboutMe() {
  return (
    <div className="w-full">
      <SectionTitle title="About Me" />
      <div className="flex flex-col md:flex-row gap-10 cursor-default">
        <div className="flex-1" {...motionProps({ side: "left" })}>
          <motion.h1
            className="text-6xl font-light"
            {...motionProps({ side: "left" })}
          >
            Hi, I'm{" "}
            <span className="text-accent text-shadow-accent/25 hover:text-shadow-accent/50 text-spotlight transition-all duration-500">
              Artiom
            </span>
          </motion.h1>
          <motion.p {...motionProps({ side: "left" })}>
            ~ Brings ideas to reality ~
          </motion.p>
          <div className="flex flex-col gap-4 my-5 tracking-wider">
            {details.map((item, index) => (
              <motion.p
                key={index}
                {...motionProps({
                  side: "left",
                  distance: 80,
                  delay: 0.1 * index,
                })}
                className="text-muted inline-flex items-center gap-3"
              >
                <item.icon className="text-accent h-5" />
                {item.text}
              </motion.p>
            ))}
          </div>
          <motion.p
            className="mt-4 text-muted"
            {...motionProps({ side: "left" })}
          >
            Specialising in building modern web apps, mobile apps, and
            automation scripts — tailored to bring your unique ideas to life.
          </motion.p>
        </div>
        <motion.div className="flex-1" {...motionProps({ side: "right" })}>
          <h2 className="text-2xl font-normal">Key Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {Object.values(skills).map((item, index) => (
              <motion.li
                key={index}
                className="inline-flex items-center gap-2 p-1 px-4 rounded-full text-gray-700 dark:text-gray-300 bg-accent-200/8 hover:bg-accent-200/20 cursor-default transition-colors group hover:text-primary"
                {...motionProps({
                  side: "bottom",
                  distance: 10,
                  delay: 0.1 * index,
                  transition: { duration: 0.2 },
                })}
              >
                <item.icon className="text-accent/70 h-5 wiggle-md group-hover:text-accent" />
                {item.name}
              </motion.li>
            ))}
          </ul>
          <h2 className="text-2xl font-normal mt-4">Services</h2>
          <ul className="list-none flex flex-col gap-2">
            {services.map((item, index) => (
              <motion.li
                key={index}
                className="inline-flex items-center gap-2 group"
                {...motionProps({
                  side: "right",
                  distance: 80,
                  delay: 0.1 * index,
                })}
              >
                <ArrowUp className="text-accent h-4 group-hover:animate-bounce rotate-90" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.div
        className="flex gap-5 mt-10"
        {...motionProps({ side: "bottom" })}
      >
        <Button
          variant="default"
          onClick={() => alert("Haha no contact form yet!")}
        >
          Contact Me
        </Button>
        <Button
          variant="outline"
          onClick={() => alert("Haha no projects page yet!")}
        >
          See Projects
        </Button>
      </motion.div>
      <motion.div
        {...motionProps({ side: "bottom" })}
        className="min-h-[100px] h-[15vh] text-gray-500 w-full flex flex-col items-center justify-end mt-10 animate-pulse"
      >
        <div
          className="flex flex-col items-center gap-3"
          onClick={() => {
            window.scrollTo({ top: 100, behavior: "smooth" });
          }}
        >
          <p>Scroll to see more!</p>
          <div className="w-[1px] h-[50px] bg-gray-500" />
        </div>
      </motion.div>
    </div>
  );
}
