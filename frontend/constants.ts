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
  "AI Integration",
];

export const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Core",
    items: [skills.typescript, skills.javascript, skills.react],
  },
  {
    label: "Also use",
    items: [skills.python, skills.go, skills.java, skills.electron, skills.expo],
  },
  {
    label: "Tools",
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
      "Solving tricky problems and debugging across the full stack",
      "Talking to clients and planning project scope",
      "Designing apps that grow with their users",
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
      "Worked on research and development projects",
      "Critical thinking and problem analysis",
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
      "Project management, Java, and Swift",
      "Mobile development with Android Studio and Xcode",
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
    name: "Esperantoo",
    tagline: "Reading meets language learning.",
    description:
      "An iOS, Android, and web app that turns reading into language learning. Read the original text with natural translations line by line, tap any word to see how it connects across languages — even when word order changes — and pick up right where you left off, with chapter and page tracked automatically.",
    download: [
      {
        platform: "iOS",
        url: "https://apps.apple.com/gb/app/esperantoo/id6758854217",
      },
      {
        platform: "Android",
        url: "https://play.google.com/store/apps/details?id=io.wakeflow.traduire",
      },
      {
        platform: "Web",
        url: "https://esperantoo.com",
      },
    ],
    skills: [skills.typescript, skills.react, skills.expo],
    year: "2025",
    kind: "client work",
  },
  {
    name: "360 Private Travel — Events module",
    tagline: "Brought event management in-house.",
    description:
      "Contributed to the iOS and Android apps for a private members' luxury travel platform. Built the events module that replaced their third-party event manager, letting the team create, run, and track events without leaving their own app.",
    src: "https://360privatetravel.com/",
    download: [
      {
        platform: "Web",
        url: "https://360privatetravel.com/",
      },
    ],
    skills: [skills.typescript, skills.react, skills.expo],
    year: "2026",
    kind: "client work",
  },
  {
    name: "TimeTrekker",
    tagline: "Know where your hours go.",
    description:
      "A free, open-source tool that tracks the apps you use and turns it into clear stats and insights. For people who want to understand how they spend their time on their computer.",
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
      "A fast file storage app. Drop a file in, get a link, share it. Built to stay out of your way.",
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
      "A Go tool that talks to Philips Hue lights over Bluetooth. Turn them on, dim them, or change colour from the terminal — no hub needed.",
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
    tagline: "An AI helper for insurance advisers.",
    description:
      "An AI tool that helps UK financial advisers answer questions about Life Insurance, Critical Illness, and Income Protection cover.",
    skills: [skills.javascript, skills.react],
    year: "2025",
    kind: "client work",
  },
  {
    name: "Text Classifier",
    tagline: "Sorts text into categories, live in your browser.",
    description:
      "A web app that uses TensorFlow to sort text into preset categories as you type. Small, fast, and surprisingly useful.",
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
  { key: "Building", text: "internal tools and automations at Wakeflow" },
  { key: "Tinkering", text: "with Bluetooth, Electron, and small Go tools after work" },
  { key: "Learning", text: "distributed systems and Rust, bit by bit" },
  { key: "Drinking", text: "too much coffee, as usual" },
];
