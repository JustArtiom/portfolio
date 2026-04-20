import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const sectionIds = ["about", "work", "projects", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    let ticking = false;
    const calc = () => {
      ticking = false;
      const anchor = window.scrollY + window.innerHeight * 0.25;
      let current: SectionId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= anchor) current = id;
        else break;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calc);
        ticking = true;
      }
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

function useCursorGlow() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}

function useTheme(): ["light" | "dark", () => void] {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("portfolio-theme", next);
      return next;
    });
  }, []);

  return [theme, toggle];
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-50 pointer-events-none"
    />
  );
}

export default function App() {
  const active = useActiveSection();
  const [theme, toggleTheme] = useTheme();
  useCursorGlow();

  const navTo = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header
        activeSection={active}
        onNav={navTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main id="top" className="pt-10">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
