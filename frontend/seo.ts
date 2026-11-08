import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://artiom.me";

/** Link preview image, a file in frontend/public. */
export interface SocialImage {
  path: string;
  alt: string;
}

// Every card in frontend/public/og is made at Open Graph's recommended size.
const SOCIAL_IMAGE_WIDTH = 1200;
const SOCIAL_IMAGE_HEIGHT = 630;

export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  path: "/og/default.png",
  alt: "Artiom, full-stack developer in London",
};

interface PageMetaInput {
  title: string;
  description: string;
  /** Path on the site, e.g. "/blog". Used for the canonical and og:url. */
  path: string;
  /** Shorter versions for social cards; default to the page ones. */
  socialTitle?: string;
  socialDescription?: string;
  image?: SocialImage;
  /** Marks the page as a blog post (og:type article). */
  article?: { publishedTime?: string };
}

const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

function articleMeta(article: PageMetaInput["article"]): MetaDescriptor[] {
  if (!article) return [{ property: "og:type", content: "website" }];
  return [
    { property: "og:type", content: "article" },
    ...(article.publishedTime
      ? [{ property: "article:published_time", content: article.publishedTime }]
      : []),
  ];
}

function imageMeta(image: SocialImage): MetaDescriptor[] {
  const url = absoluteUrl(image.path);
  return [
    { property: "og:image", content: url },
    { property: "og:image:width", content: String(SOCIAL_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(SOCIAL_IMAGE_HEIGHT) },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: url },
    { name: "twitter:image:alt", content: image.alt },
  ];
}

/** Per-page head tags. Site-wide tags live in root.tsx. */
export function pageMeta({
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
  image = DEFAULT_SOCIAL_IMAGE,
  article,
}: PageMetaInput): MetaDescriptor[] {
  const url = absoluteUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:url", content: url },
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: socialDescription },
    { name: "twitter:title", content: socialTitle },
    { name: "twitter:description", content: socialDescription },
    ...articleMeta(article),
    ...imageMeta(image),
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
