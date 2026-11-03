import { useEffect } from "react";
import { useLocation } from "react-router";
import { MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPost";
import About from "@/components/About";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { scrollToId } from "@/utils/scroll";
import { pageMeta } from "@/seo";

export function meta() {
  return pageMeta({
    title: "Artiom — Full-Stack Developer in London · TypeScript, React, Node.js",
    description:
      "Artiom is a London-based full-stack developer building quietly useful software with TypeScript, React, Node.js, Go and Python. Open to freelance projects.",
    path: "/",
    socialTitle: "Artiom — Full-Stack Developer in London",
    socialDescription:
      "Full-stack developer building quietly useful software. TypeScript, React, Node.js, Go, Python. Open to freelance.",
  });
}

export default function Home() {
  const location = useLocation();

  // When arriving on "/" with a hash (e.g. from the blog), scroll to it.
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const raf = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(raf);
  }, [location.hash, location.key]);

  // Respect the OS "reduce motion" setting: blocks fade, no movement.
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <FeaturedPost />
      <About />
      <Work />
      <Projects />
      <Contact />
    </MotionConfig>
  );
}
