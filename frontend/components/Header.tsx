import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/assets/svg/logo.svg";
import { Menu, X } from "lucide-react";

const sections = ["about", "roadmap", "projects", "contact"] as const;
type SectionId = (typeof sections)[number];

export default function Header() {
  const [active, setActive] = useState<SectionId>("about");
  const [underline, setUnderline] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<SectionId, HTMLAnchorElement | null>>({
    about: null,
    roadmap: null,
    projects: null,
    contact: null,
  });

  const updateUnderline = useCallback(() => {
    const ul = ulRef.current;
    const el = linkRefs.current[active ?? "about"];
    if (!ul || !el) return;
    const ulRect = ul.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left = elRect.left - ulRect.left;
    setUnderline({ left, width: elRect.width });
  }, [active]);

  useEffect(() => {
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  useEffect(() => {
    updateUnderline();
  }, [active, updateUnderline]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      obs.observe(target);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div
      ref={headerRef}
      className="fixed w-full flex flex-col justify-between items-center backdrop-blur-md z-[500]"
    >
      <header className="w-full px-6 sm:px-6 mx-auto flex justify-between items-center max-w-[1200px] py-4 sm:py-6">
        <Logo className="h-8 w-8 mx-2" />

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul ref={ulRef} className="relative flex">
            {/* Animated underline (desktop only) */}
            <div
              className="absolute h-[1px] bg-accent -bottom-1 left-0 transition-all duration-300"
              style={{
                width: underline.width,
                transform: `translateX(${underline.left}px)`,
              }}
            />
            {sections.map((item) => (
              <li key={item} className="hover:animate-wiggle">
                <a
                  ref={(el) => {
                    linkRefs.current[item] = el;
                  }}
                  href={`#${item}`}
                  className={`p-2 text-sm uppercase tracking-wider transition-colors mx-2 ${
                    active === item ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile nav panel */}
      <div
        className={`md:hidden w-full px-4 sm:px-6 transition-[max-height,opacity] duration-300 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav>
          <ul className="flex flex-col gap-2 py-2">
            {sections.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full py-2 text-sm uppercase tracking-wider rounded px-2 transition-colors ${
                    active === item
                      ? "text-accent bg-accent/10"
                      : "hover:text-accent"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
