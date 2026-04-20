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

export const site = {
  name: "Artiom",
  email: "hello@artiom.me",
  domain: "artiom.me",
  birthDate: "2005-06-01",
  careerStart: "2022-07-01",
  version: "v2026.04",
};

export const details = [
  { icon: MapPin, label: "Location", text: "London, United Kingdom" },
  {
    icon: Calendar,
    label: "Age",
    text: `${getAgeSince(site.birthDate)} Years Old`,
  },
  { icon: Code, label: "Role", text: "Full-Stack Developer" },
  {
    icon: BriefcaseBusiness,
    label: "Experience",
    text: `${getAgeSince(site.careerStart)}+ Years`,
  },
];

export interface Skill {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const skills: Record<string, Skill> = {
  typescript: { name: "TypeScript", icon: SiTypescript },
  javascript: { name: "JavaScript", icon: SiJavascript },
  python: { name: "Python", icon: SiPython },
  java: { name: "Java", icon: FaJava },
  go: { name: "Go", icon: SiGo },
  react: { name: "React", icon: SiReact },
  electron: { name: "Electron", icon: SiElectron },
  expo: { name: "Expo", icon: SiExpo },
  tensorflow: { name: "TensorFlow", icon: SiTensorflow },
  git: { name: "Git", icon: SiGit },
  googleCloud: { name: "Google Cloud", icon: SiGooglecloud },
};

export const services = [
  "Full-Stack Web Development",
  "Android & iOS Mobile Apps",
  "Automation & Scripting",
  "LLM & AI Integration",
];

export const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Core",
    items: [skills.typescript, skills.javascript, skills.react],
  },
  {
    label: "Also ship",
    items: [skills.python, skills.go, skills.java, skills.electron, skills.expo],
  },
  {
    label: "Infra & Tools",
    items: [skills.googleCloud, skills.git, skills.tensorflow],
  },
];

export interface RoadmapItem {
  title: string;
  company?: { name: string; logo?: string; website?: string };
  location: string;
  from: Date;
  to?: Date;
  achieved?: string[];
  learned?: string[];
  skills?: Skill[];
  active?: boolean;
}

export const roadmap: RoadmapItem[] = [
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
      "Complex problem solving & debugging across the stack",
      "Client communication and scoping",
      "Scalable application architectures",
      "Built automated workflows",
    ],
    active: true,
  },
  {
    title: "BSc Computer Science",
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
      "Algorithms, data structures, and software engineering",
      "Engaged in research and development projects",
      "Critical thinking and analytical skills",
    ],
    active: true,
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
      "Full-stack development with modern frameworks",
      "Built a VPN application using Electron + React",
    ],
  },
  {
    title: "A-Levels · BTEC Extended Diploma in IT",
    company: {
      name: "Leyton Sixth Form College",
      logo: "https://www.leyton.ac.uk/wp-content/themes/C4/assets/images/global/logo.svg",
      website: "https://leyton.ac.uk",
    },
    location: "London, United Kingdom",
    from: new Date("2021-09-01"),
    to: new Date("2023-09-01"),
    achieved: ["A-Levels", "BTEC Extended Diploma in IT"],
    learned: [
      "Project management, Java & Swift",
      "Android Studio / Xcode mobile dev",
      "Databases and API integration",
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  src?: string;
  download?: { platform: string; url: string }[];
  skills: Skill[];
  year: string;
  kind: string;
}

export const projects: Project[] = [
  {
    name: "TimeTrekker",
    tagline: "Know where your hours go.",
    description:
      "A free and open-source tool that quietly tracks the apps you use and turns the data into detailed statistics and insights. For people who want to understand their own computer time.",
    src: "https://github.com/JustArtiom/TimeTrekker",
    download: [
      {
        platform: "Windows",
        url: "https://github.com/JustArtiom/TimeTrekker/releases/download/Prototype/timetrekker-prototype-win-x64-Installer.exe",
      },
    ],
    skills: [skills.electron, skills.react, skills.typescript],
    year: "2024",
    kind: "open source",
  },
  {
    name: "UpApp",
    tagline: "Upload, host, share — in seconds.",
    description:
      "A fast file-storage client powered by a MinIO backend. Drop, share, done. Designed to stay out of your way.",
    src: "https://github.com/JustArtiom/UpApp",
    download: [
      {
        platform: "Windows",
        url: "https://github.com/JustArtiom/UpApp/releases/download/v0.0.1-alpha/upapp-0.0.1-alpha.Setup.exe",
      },
    ],
    skills: [skills.electron, skills.react, skills.typescript, skills.go],
    year: "2024",
    kind: "open source",
  },
  {
    name: "GoHueBLE",
    tagline: "Scripts for your lightbulbs.",
    description:
      "A Go utility that speaks Bluetooth Low Energy to Philips Hue lights. Toggle, dim, and colour-control from the terminal, without touching the hub.",
    src: "https://github.com/JustArtiom/GoHueBLE",
    download: [
      {
        platform: "Windows",
        url: "https://github.com/JustArtiom/GoHueBle/releases/download/v1.0.0/GoHueBle-v1.0.0-windows-amd64.exe",
      },
      {
        platform: "Linux",
        url: "https://github.com/JustArtiom/GoHueBle/releases/download/v1.0.0/GoHueBle-v1.0.0-linux-amd64",
      },
    ],
    skills: [skills.go],
    year: "2024",
    kind: "open source",
  },
  {
    name: "TILC Agent",
    tagline: "An AI second opinion for underwriters.",
    description:
      "An AI-powered agent built to help UK financial advisers with underwriting queries for Life Insurance, Critical Illness, and Income Protection.",
    skills: [skills.javascript, skills.react],
    year: "2025",
    kind: "client work",
  },
  {
    name: "Text Classifier",
    tagline: "Real-time text classification in the browser.",
    description:
      "A TensorFlow-powered web app that categorises user text into pre-defined buckets in real time. Small, fast, surprisingly useful.",
    src: "https://github.com/JustArtiom/text-classifier-AI",
    skills: [skills.python, skills.tensorflow],
    year: "2023",
    kind: "research",
  },
];

export const socials = [
  {
    label: "GitHub",
    handle: "@JustArtiom",
    href: "https://github.com/JustArtiom",
  },
  {
    label: "LinkedIn",
    handle: "artiom",
    href: "https://linkedin.com/",
  },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
  },
];

export const nowDoing = [
  { key: "Building", text: "internal tools & automations at Wakeflow" },
  { key: "Tinkering", text: "with BLE, Electron, and small Go CLIs after hours" },
  { key: "Learning", text: "distributed systems & Rust, slowly" },
  { key: "Drinking", text: "too much coffee, as usual" },
];
