import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { scrollToId } from "@/utils/scroll";

export default function Home() {
  const location = useLocation();

  // When arriving on "/" with a hash (e.g. from the blog), scroll to it.
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const raf = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(raf);
  }, [location.hash, location.key]);

  return (
    <>
      <Hero />
      <About />
      <Work />
      <Projects />
      <Contact />
    </>
  );
}
