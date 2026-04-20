import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/assets/svg/logo.svg";
import { cn } from "@/utils/cn";
import { yearsSince } from "@/utils/math";
import { site } from "@/constants";
import NavLinks, { type NavLink } from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

const LINKS: readonly NavLink[] = [
  { id: "about", label: "About", num: "01" },
  { id: "work", label: "Work", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
];

type Props = {
  activeSection: string;
  onNav: (id: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function TickerMeta() {
  const [age, setAge] = useState(() => yearsSince(site.birthDate));
  const [exp, setExp] = useState(() => yearsSince(site.careerStart));

  useEffect(() => {
    const id = setInterval(() => {
      setAge(yearsSince(site.birthDate));
      setExp(yearsSince(site.careerStart));
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden md:inline-flex items-baseline gap-1.5 pl-3 ml-1 border-l border-line font-mono text-[11px] text-muted">
      <span className="inline-block min-w-[8ch] tabular-nums text-ink-2">
        {age.toFixed(6)}
      </span>
      <span className="text-faint">yrs</span>
      <span className="text-faint">·</span>
      <span className="inline-block min-w-[8ch] tabular-nums text-ink-2">
        {exp.toFixed(6)}
      </span>
      <span className="text-faint">exp</span>
    </span>
  );
}

function Burger({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const bar = "block w-[18px] h-[1.5px] bg-ink origin-center";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="md:hidden w-10 h-10 rounded-lg border border-line bg-bg-2 flex flex-col items-center justify-center gap-1"
    >
      <span
        className={cn(
          bar,
          "transition-transform duration-200",
          open && "translate-y-[5.5px] rotate-45"
        )}
      />
      <span
        className={cn(
          bar,
          "transition-opacity duration-200",
          open && "opacity-0"
        )}
      />
      <span
        className={cn(
          bar,
          "transition-transform duration-200",
          open && "-translate-y-[5.5px] -rotate-45"
        )}
      />
    </button>
  );
}

export default function Header({
  activeSection,
  onNav,
  theme,
  onToggleTheme,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-line-2 bg-[color-mix(in_oklab,var(--color-bg)_80%,transparent)] backdrop-blur-md backdrop-saturate-150"
    >
      <div className="max-w-page mx-auto flex items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNav("top");
          }}
          className="flex items-center gap-3 font-medium"
        >
          <span className="inline-flex w-[22px] h-[22px] items-center justify-center text-ink">
            <Logo className="h-full w-full" />
          </span>
          <span className="tracking-tight">{site.name}</span>
          <TickerMeta />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          <NavLinks links={LINKS} activeId={activeSection} onNav={onNav} />
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
            className="ml-2"
          />
        </nav>

        <Burger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-line bg-bg transition-[max-height,opacity] duration-200",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-5 py-3 gap-1">
          <NavLinks
            links={LINKS}
            activeId={activeSection}
            onNav={(id) => {
              onNav(id);
              setMenuOpen(false);
            }}
            orientation="vertical"
          />
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
            className="mt-2 self-end"
          />
        </nav>
      </div>
    </motion.header>
  );
}
