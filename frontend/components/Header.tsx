import { useEffect, useRef, useState } from "react";
import Logo from "@/assets/svg/logo.svg";

const sections = ["about", "roadmap", "projects", "contact"] as const;
type SectionId = (typeof sections)[number];

export default function Header() {
  const [active, setActive] = useState<SectionId>("about");
  const [underline, setUnderline] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const ulRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<SectionId, HTMLAnchorElement | null>>({
    about: null,
    roadmap: null,
    projects: null,
    contact: null,
  });

  const updateUnderline = () => {
    const ul = ulRef.current;
    const el = linkRefs.current[active ?? "about"];
    if (!ul || !el) return;
    const ulRect = ul.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left = elRect.left - ulRect.left;
    setUnderline({ left, width: elRect.width });
  };

  useEffect(() => {
    updateUnderline();
    const onResize = () => updateUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateUnderline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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
          rootMargin: "-50% 0px -50% 0px", // focus on the vertical middle
          threshold: 0,
        }
      );

      obs.observe(target);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed w-full flex justify-between items-center backdrop-blur-md z-30">
      <header className="w-full px-6 mx-auto flex justify-between items-center max-w-[1200px] py-6">
        <Logo className="h-8 w-8" />
        <nav>
          <ul ref={ulRef} className="relative flex">
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
                  className={`p-2 text-sm uppercase tracking-wider transition-colors mx-2 ${
                    active === item ? "text-accent" : "hover:text-accent"
                  }`}
                  onClick={() => {
                    const section = document.getElementById(item);
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}
