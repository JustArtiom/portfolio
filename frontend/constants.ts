import { BriefcaseBusiness, Calendar, Code, MapPin } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiElectron,
  SiExpo,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiPython,
  SiReact,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { getAgeSince } from "./utils/math";

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

export interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const skills: Record<string, Skill> = {
  typescript: {
    name: "TypeScript",
    icon: SiTypescript,
  },
  javascript: {
    name: "JavaScript",
    icon: SiJavascript,
  },
  python: {
    name: "Python",
    icon: SiPython,
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
  electron: {
    name: "Electron",
    icon: SiElectron,
  },
  expo: {
    name: "Expo",
    icon: SiExpo,
  },
  tensorflow: {
    name: "TensorFlow",
    icon: SiTensorflow,
  },
  git: {
    name: "Git",
    icon: SiGit,
  },
  googleCloud: {
    name: "Google Cloud",
    icon: SiGooglecloud,
  },
};

export const services = [
  `Full-Stack Web Development`,
  `Android & iOS Mobile Apps`,
  `Automation & Scripting`,
  `LLM & AI Integration`,
];

export const roadmap = [
  {
    title: "Going to School",
    location: "London, United Kingdom",
    from: new Date("2012-09-01"),
    to: new Date("2021-09-01"),
    achieved: ["GCSEs"],
    learned: ["Basic knowledge"],
  },
  {
    title: "Going to College",
    company: {
      name: "Leyton Sixth Form College",
      logo: "https://www.leyton.ac.uk/wp-content/themes/C4/assets/images/global/logo.svg",
      website: "https://leyton.ac.uk",
    },
    location: "London, United Kingdom",
    from: new Date("2021-09-01"),
    to: new Date("2023-09-01"),
    achieved: ["A-Levels", "BTEC Extended Diploma In IT"],
    learned: [
      "Project Management",
      "Java and Swift programming",
      "Mobile application development with Android Studio and Xcode",
      "Database management and API integration",
    ],
  },
  {
    title: "Junior Full-Stack Developer",
    company: {
      name: "DanBot Hosting",
      logo: "https://avatars.githubusercontent.com/u/73919385",
      website: "https://danbot.host",
    },
    location: "London, United Kingdom",
    from: new Date("2022-07-01"),
    to: new Date("2024-06-30"),
    skills: [skills.react, skills.typescript, skills.git, skills.electron],
    learned: [
      "Full-Stack development",
      "Modern web technologies and frameworks",
      "Created VPN application using Electron and React",
    ],
  },
  {
    title: "Going to University",
    company: {
      name: "University of Hertfordshire",
      logo: "https://www.herts.ac.uk/__data/assets/git_bridge/0005/258683/dist/mysource_files/herts-logo.svg?h=987654321",
      website: "https://www.herts.ac.uk",
    },
    location: "Hatfield, United Kingdom",
    from: new Date("2023-09-01"),
    to: undefined,
    achieved: ["BSc Computer Science"],
    learned: [
      "Learning computer science fundamentals",
      "Algorithms, data structures, and software engineering",
      "Engaged in research and development projects",
      "Enhanced critical thinking and analytical skills",
    ],
  },
  {
    title: "Mid-Level Full-Stack Developer",
    company: {
      name: "Wakeflow",
      logo: "https://www.wakeflow.io/branding/padded.png",
      website: "https://wakeflow.io",
    },
    location: "London, United Kingdom",
    from: new Date("2025-02-12"),
    to: undefined,
    skills: [
      skills.javascript,
      skills.react,
      skills.expo,
      skills.googleCloud,
      skills.git,
    ],
    learned: [
      "Complex problems solving and debugging",
      "Client communication",
      "Scalable application architectures",
      "Implementing best practices",
      "Created automated workflows",
    ],
  },
];
