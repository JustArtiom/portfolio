import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { scrollToId } from "@/utils/scroll";
import { THEME_STORAGE_KEY } from "@/utils/theme";
import { useIsDark } from "@/utils/useIsDark";

const sectionIds = ["about", "work", "projects", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

function useActiveSection(enabled: boolean): SectionId {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  return active;
}

// The `dark` class on <html> is the source of truth; useIsDark follows it.
function useTheme(): ["light" | "dark", () => void] {
  const isDark = useIsDark();

  const toggle = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem(THEME_STORAGE_KEY, nextDark ? "dark" : "light");
  }, []);

  return [isDark ? "dark" : "light", toggle];
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const sectionActive = useActiveSection(isHome);
  const [theme, toggleTheme] = useTheme();

  const active = isHome ? sectionActive : "blog";

  // Reset scroll on route change (unless a hash target will handle it).
  // Skipped on first load: the prerendered page is scrollable before JS
  // arrives, so resetting on hydration would yank visitors back to the top.
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const navTo = useCallback(
    (id: string) => {
      if (id === "blog") {
        navigate("/blog");
        return;
      }
      if (id === "top") {
        if (!isHome) navigate("/");
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      // section link
      if (!isHome) {
        navigate(`/#${id}`);
      } else {
        scrollToId(id);
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [navigate, isHome]
  );

  return (
    <>
      <Header
        activeSection={active}
        onNav={navTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main id="top" className="pt-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
