import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/components/pages/Home";
import Blog from "@/components/pages/Blog";
import BlogPost from "@/components/pages/BlogPost";

// Dev-only 3D scene editor — lazily loaded so leva/editor code never ships to prod.
const SceneDev = lazy(() => import("@/components/pages/SceneDev"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
        {import.meta.env.DEV && (
          <Route
            path="dev/scene"
            element={
              <Suspense fallback={null}>
                <SceneDev />
              </Suspense>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
