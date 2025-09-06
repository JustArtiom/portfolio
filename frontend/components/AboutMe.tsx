import { ArrowRight } from "lucide-react";

import { details, services, skills } from "@/utils/data";
import Button from "./Buton";

export default function AboutMe() {
  return (
    <div className="w-full">
      <p className="text-xl font-thin tracking-widest dark:text-gray-400 text-gray-600 mb-8">
        About Me
      </p>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-6xl font-light">
            Hi, I'm <span className="text-accent">Artiom</span>
          </h1>
          <p>~ Brings ideas to reality ~</p>
          <div className="flex flex-col gap-4 my-5 tracking-wider cursor-default">
            {details.map((item, index) => (
              <p
                key={index}
                className="text-muted inline-flex items-center gap-3 group"
              >
                <item.icon className="text-accent h-5 group-hover:animate-wiggle wiggle-xl" />
                {item.text}
              </p>
            ))}
          </div>
          <p className="mt-4 text-muted">
            Specialising in building modern web apps, mobile apps, and
            automation scripts — tailored to bring your unique ideas to life.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-normal">Key Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {Object.values(skills).map((item, index) => (
              <li
                key={index}
                className="inline-flex items-center gap-2 p-1 px-4 rounded-full text-gray-300 bg-accent-200/8 hover:bg-accent-200/20 cursor-default transition-colors group hover:text-primary"
              >
                <item.icon className="text-accent/70 h-5 wiggle-md group-hover:text-accent" />
                {item.name}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-normal mt-4">Services</h2>
          <ul className="list-none flex flex-col gap-2">
            {services.map((item, index) => (
              <li key={index} className="inline-flex items-center gap-2">
                <ArrowRight className="text-accent h-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-5 mt-5">
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
      </div>
    </div>
  );
}
