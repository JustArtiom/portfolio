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

export const projects = [
  {
    name: "TimeTrekker",
    description:
      "A free and open-source software to let you keep track easily of your time and productivity on your pc. It keeps track of the applications you use and gives you detailed statistics and insights.",
    src: "https://github.com/JustArtiom/TimeTrekker",
    background: {
      image: "/assets/img/timetrekker.webp",
    },
    download: [
      {
        platform: "Windows",
        url: "https://github.com/JustArtiom/TimeTrekker/releases/download/Prototype/timetrekker-prototype-win-x64-Installer.exe",
      },
    ],
    skills: [skills.electron, skills.react, skills.typescript],
  },
  {
    name: "UpApp",
    description:
      "Upload, Host, Share your files in seconds. UpApp is a fast and reliable file storage client powered by a MinIO server backend, designed to simplify file management and sharing.",
    src: "https://github.com/JustArtiom/UpApp",
    background: {
      image: "https://github.com/JustArtiom/UpApp/raw/main/.example/demo.gif",
    },
    download: [
      {
        platform: "Windows",
        url: "https://github.com/JustArtiom/UpApp/releases/download/v0.0.1-alpha/upapp-0.0.1-alpha.Setup.exe",
      },
    ],
    skills: [skills.electron, skills.react, skills.typescript, skills.go],
  },
  {
    name: "GoHueBLE",
    description:
      "A simple Go-based utility to control BLE (Bluetooth Low Energy) HUE light devices. This program allows you to connect to a device via BLE, turn it on/off, change its brightness, and adjust the color using XY color coordinates or RGB hex codes",
    src: "https://github.com/JustArtiom/GoHueBLE",
    background: {
      image: "/assets/img/gohueble.webp",
    },
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
  },
  {
    name: "TILC Agent",
    description:
      "An AI-powered agent to support you with UK financial advisers with underwriting queries for Life Insurance, Critical Illness, and Income Protection",
    background: {
      image: "/assets/img/tilc.webp",
    },
    skills: [skills.javascript, skills.react],
  },
  {
    name: "Text Classifier",
    description:
      "A text classification web app using TensorFlow that categorizes user-input text into predefined categories in real-time",
    src: "https://github.com/JustArtiom/text-classifier-AI",
    background: {
      image: "/assets/img/textclassifier.webp",
    },
    skills: [skills.python, skills.tensorflow],
  },
];
