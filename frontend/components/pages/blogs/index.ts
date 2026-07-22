import type { ComponentType } from "react";
import Uhra2026 from "./uhra-2026";

// Maps a blog slug (key in `blogs` from constants) to its content component.
// A post only becomes openable once it has an entry here.
export const blogContent: Record<string, ComponentType> = {
  "uhra-2026": Uhra2026,
};

export function getBlogContent(slug: string | undefined) {
  if (!slug) return undefined;
  return blogContent[slug];
}
