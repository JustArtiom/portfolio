import type { Config } from "@react-router/dev/config";
import { publishedBlogSlugs } from "./frontend/components/pages/blogs/slugs";

export default {
  appDirectory: "frontend",
  buildDirectory: "dist_frontend",
  // .mjs because package.json is "type": "commonjs" (see vite.config.mts).
  serverBuildFile: "index.mjs",
  // Static site: every page below is rendered to HTML at build time, anything
  // else falls back to client-side rendering via __spa-fallback.html.
  ssr: false,
  prerender: [
    "/",
    "/blog",
    ...publishedBlogSlugs.map((slug) => `/blog/${slug}`),
  ],
  // Opt in to v8 behaviour early so the v8 upgrade is a no-op.
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
