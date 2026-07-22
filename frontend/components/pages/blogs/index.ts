import { lazy, type ComponentType, type LazyExoticComponent } from "react";

// Maps a blog slug (key in `blogs` from constants) to its content component.
// A post only becomes openable once it has an entry here.
//
// Each post is lazy-loaded so its code (and heavy deps like three.js / R3F)
// is a separate chunk that only downloads when the post is actually opened —
// keeping it out of the main bundle.
export const blogContent: Record<
  string,
  LazyExoticComponent<ComponentType>
> = {
  "uhra-2026": lazy(() => import("./uhra-2026")),
};

export function getBlogContent(slug: string | undefined) {
  if (!slug) return undefined;
  return blogContent[slug];
}
