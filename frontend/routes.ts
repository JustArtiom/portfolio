import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

// Dev-only 3D scene editor, kept out of production builds so leva/editor code
// never ships.
const devOnlyRoutes =
  process.env.NODE_ENV === "production"
    ? []
    : [route("dev/scene", "components/pages/SceneDev.tsx")];

export default [
  layout("components/Layout.tsx", [
    index("components/pages/Home.tsx"),
    route("blog", "components/pages/Blog.tsx"),
    route("blog/:slug", "components/pages/BlogPost.tsx"),
    route("*", "components/pages/NotFound.tsx"),
  ]),
  ...devOnlyRoutes,
] satisfies RouteConfig;
