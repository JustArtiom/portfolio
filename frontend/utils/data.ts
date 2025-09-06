import { BriefcaseBusiness, Calendar, Code, MapPin } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiGit,
  SiGo,
  SiJavascript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { getAgeSince } from "./math";

export const details = [
  {
    icon: MapPin,
    text: `London, United Kingdom`,
  },
  {
    icon: Calendar,
    text: `${getAgeSince(`2005-06-01`)} Years Old`,
  },
  {
    icon: Code,
    text: `Full-Stack Developer`,
  },
  {
    icon: BriefcaseBusiness,
    text: `${getAgeSince(`2021-01-01`)}+ Years of Experience`,
  },
];

export const skills = {
  javascript: {
    name: "JavaScript",
    icon: SiJavascript,
  },
  python: {
    name: "Python",
    icon: SiPython,
  },
  typescript: {
    name: "TypeScript",
    icon: SiTypescript,
  },
  java: {
    name: "Java",
    icon: FaJava,
  },
  go: {
    name: "Go",
    icon: SiGo,
  },
  react: {
    name: "React",
    icon: SiReact,
  },
  tailwind: {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
  },
  tensorflow: {
    name: "TensorFlow",
    icon: SiTensorflow,
  },
  git: {
    name: "Git",
    icon: SiGit,
  },
};

export const services = [
  `Full-Stack Web Development`,
  `Android & iOS Mobile Apps`,
  `Automation & Scripting`,
  `LLM & AI Integration`,
];
