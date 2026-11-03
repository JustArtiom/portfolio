// Every post that has content, listed or not. Kept free of React imports so
// react-router.config.ts can read it to prerender each post.
export const publishedBlogSlugs = ["uhra-2026", "tmis"] as const;

export type PublishedBlogSlug = (typeof publishedBlogSlugs)[number];
