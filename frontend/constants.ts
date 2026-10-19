import { FaJava } from "react-icons/fa";
import {
  SiElectron,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiRos,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

export const site = {
  name: "Artiom",
  email: "hello@artiom.me",
  domain: "artiom.me",
  birthDate: "2005-06-01",
  careerStart: "2022-07-01",
  version: "v2026.07",
};

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
  node: { name: "Node.js", icon: SiNodedotjs },
  postgres: { name: "PostgreSQL", icon: SiPostgresql },
  openai: { name: "OpenAI", icon: SiOpenai },
  express: { name: "Express", icon: SiExpress },
  prisma: { name: "Prisma", icon: SiPrisma },
  firebase: { name: "Firebase", icon: SiFirebase },
  reactNative: { name: "React Native", icon: SiReact },
  ros: { name: "ROS 2", icon: SiRos },
  pytorch: { name: "PyTorch", icon: SiPytorch },
};

export const skillGroups: { label: string; items: Skill[] }[] = [
  {
    label: "Languages",
    items: [skills.typescript, skills.javascript, skills.python, skills.go],
  },
  {
    label: "Web and mobile",
    items: [skills.react, skills.reactNative, skills.expo, skills.electron],
  },
  {
    label: "Back end and cloud",
    items: [
      skills.node,
      skills.express,
      skills.postgres,
      skills.prisma,
      skills.googleCloud,
      skills.firebase,
    ],
  },
  {
    label: "AI and robotics",
    items: [skills.openai, skills.pytorch, skills.tensorflow, skills.ros],
  },
];

/** A client someone was placed with while employed (e.g. agency work). */
export interface ClientWork {
  name: string;
  /** One line on what the client does. */
  about?: string;
  website?: string;
  from: Date;
  to?: Date;
  highlights?: string[];
  skills?: Skill[];
  /** Extra links shown as small pills, e.g. app store pages. */
  links?: { label: string; url: string }[];
}

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
  /** Clients worked for during this role. Rendered newest first. */
  clients?: ClientWork[];
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
    clients: [
      {
        name: "360 Private Travel",
        about: "Private members' luxury travel platform.",
        website: "https://360privatetravel.com/",
        from: new Date("2025-10-23"),
        to: new Date("2026-10-16"),
        highlights: [
          "Built the events module in the app and API, replacing their third-party event tool: registration, attendee choices, partner requests and approvals",
          "Built an AI automation service with the OpenAI Agents SDK that syncs hotel and room data from hotel websites, with an approval step before changes go live",
          "Improved security across their services: service-to-service auth with Google OIDC and narrower permissions",
          "Optimised their network usage, saving over 26% bandwidth on both client and server side",
        ],
        skills: [
          skills.typescript,
          skills.react,
          skills.expo,
          skills.node,
          skills.googleCloud,
          skills.openai,
        ],
      },
      {
        name: "Esperantoo",
        about: "Language learning app built around reading books.",
        website: "https://esperantoo.com",
        from: new Date("2026-02-06"),
        to: new Date("2026-03-02"),
        highlights: [
          "Built it solo in under a month: Expo app for iOS, Android and web, plus the API",
          "Line-by-line translations, with tap-a-word linking that still works when word order changes between languages",
          "Splits books into chapters and pages and remembers where you left off",
        ],
        skills: [skills.typescript, skills.react, skills.expo, skills.node],
        links: [
          {
            label: "iOS",
            url: "https://apps.apple.com/gb/app/esperantoo/id6758854217",
          },
          {
            label: "Android",
            url: "https://play.google.com/store/apps/details?id=io.wakeflow.traduire",
          },
        ],
      },
      {
        name: "The Interesting Life Company",
        about: "AI assistant for UK financial advisers.",
        website: "https://interestinglife.co.uk",
        from: new Date("2025-07-31"),
        to: new Date("2025-09-29"),
        highlights: [
          "Built it end to end, solo: React front end, Express and Prisma back end on Cloud Run",
          "Chat with tool calls that read and update client records, draft emails and edit documents, streamed over WebSockets",
          "Knowledge base search over the company's own documents using vector embeddings",
          "Stripe subscriptions, Google sign-in, reCAPTCHA and an admin view",
        ],
        skills: [
          skills.javascript,
          skills.react,
          skills.node,
          skills.postgres,
          skills.openai,
        ],
      },
    ],
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
    to: new Date("2026-09-01"),
    achieved: ["BSc Computer Science"],
    learned: [
      "Algorithms, data structures, and software engineering",
      "Worked on research and development projects",
      "Critical thinking and problem analysis",
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
    name: "GoHueBLE",
    tagline: "Scripts for your lightbulbs.",
    description:
      "A Go tool that controls Philips Hue bulbs straight over Bluetooth, no Hue Bridge needed. I reverse engineered the bulbs' custom Bluetooth characteristics and colour format, so you can switch them on, dim them or change colour from the terminal.",
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
];

export const socials = [
  {
    label: "GitHub",
    handle: "@JustArtiom",
    href: "https://github.com/JustArtiom",
  },
  {
    label: "LinkedIn",
    handle: "artiom-cebotari",
    href: "https://www.linkedin.com/in/artiom-cebotari?utm_source=artiom.me",
  },
];

export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  banner: string;
  /** Image or video paths (public folder). `.mp4`/`.webm` render as video. */
  gallery?: string[];
}

export const blogs = {
  "uhra-2026": {
    title: "Formula Student - UH Racing Autonomous 2026",
    description:
      "A deep dive into the UH Racing team's efforts to develop an autonomous vehicle for the Formula Student 2026 competition...",
    date: "2026-06-21",
    banner: "/assets/img/UHRA_and_FS.png",
    gallery: [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
    ],
  },
} satisfies Record<string, BlogMeta>;

export type BlogSlug = keyof typeof blogs;
