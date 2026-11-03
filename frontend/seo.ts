import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://artiom.me";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path on the site, e.g. "/blog". Used for the canonical and og:url. */
  path: string;
  /** Shorter versions for social cards; default to the page ones. */
  socialTitle?: string;
  socialDescription?: string;
}

/** Per-page head tags. Site-wide tags live in root.tsx. */
export function pageMeta({
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
}: PageMetaInput): MetaDescriptor[] {
  const url = new URL(path, SITE_URL).href;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:url", content: url },
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: socialDescription },
    { name: "twitter:title", content: socialTitle },
    { name: "twitter:description", content: socialDescription },
  ];
}

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Artiom",
    url: SITE_URL,
    email: "mailto:hello@artiom.me",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack developer based in London, building quietly useful software with TypeScript, React, Node.js, Go and Python.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "United Kingdom",
    },
    worksFor: {
      "@type": "Organization",
      name: "Wakeflow",
      url: "https://wakeflow.io",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Hertfordshire",
      url: "https://www.herts.ac.uk",
    },
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "Go",
      "Python",
      "Electron",
      "Expo",
      "Google Cloud",
      "Full-Stack Development",
      "Mobile App Development",
      "Automation",
    ],
    sameAs: ["https://github.com/JustArtiom", "https://wakeflow.io"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Artiom — Full-Stack Developer",
    url: SITE_URL,
    inLanguage: "en-GB",
    author: { "@type": "Person", name: "Artiom" },
  },
];
