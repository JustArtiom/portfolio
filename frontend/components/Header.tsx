import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Logo from "@/assets/svg/logo.svg";
import { cn } from "@/utils/cn";
import { yearsSince } from "@/utils/math";
import { site } from "@/constants";

const links = [
  { id: "about", label: "About", num: "01" },
  { id: "work", label: "Work", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
] as const;

type Props = {
  activeSection: string;
  onNav: (id: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export default function Header({ activeSection, onNav, theme, onToggleTheme }: Props) {
  const [age, setAge] = useState(() => yearsSince(site.birthDate));
  const [exp, setExp] = useState(() => yearsSince(site.careerStart));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAge(yearsSince(site.birthDate));
      setExp(yearsSince(site.careerStart));
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-line-2 bg-[color-mix(in_oklab,var(--color-bg)_80%,transparent)] backdrop-blur-md backdrop-saturate-150"
    >
      <div className="max-w-page mx-auto flex items-center justify-between gap-6 px-5 py-4 md:px-10">
        {/* Mark */}
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
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => {
            const active = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(l.id);
                }}
                className={cn(
                  "inline-flex items-baseline gap-1.5 px-3.5 py-2 rounded-full transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink hover:bg-bg-2"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    active ? "text-accent" : "text-faint"
                  )}
                >
                  {l.num}
                </span>
                {l.label}
              </a>
            );
          })}
          <motion.button
            type="button"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: -30 }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="ml-2 w-9 h-9 rounded-full border border-line bg-bg-2 text-ink inline-flex items-center justify-center transition-colors hover:border-ink hover:text-accent overflow-hidden"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </motion.span>
          </motion.button>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden w-10 h-10 rounded-lg border border-line bg-bg-2 flex flex-col items-center justify-center gap-1"
        >
          <span
            className={cn(
              "block w-[18px] h-[1.5px] bg-ink transition-transform duration-200 origin-center",
              menuOpen && "translate-y-[5.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block w-[18px] h-[1.5px] bg-ink transition-opacity duration-200",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-[18px] h-[1.5px] bg-ink transition-transform duration-200 origin-center",
              menuOpen && "-translate-y-[5.5px] -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile nav panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-line bg-bg transition-[max-height,opacity] duration-200",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-5 py-3 gap-1">
          {links.map((l) => {
            const active = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(l.id);
                  setMenuOpen(false);
                }}
                className={cn(
                  "inline-flex items-baseline gap-2 px-3 py-3 rounded-lg text-[15px] transition-colors",
                  active ? "text-ink bg-bg-2" : "text-muted hover:text-ink"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    active ? "text-accent" : "text-faint"
                  )}
                >
                  {l.num}
                </span>
                {l.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={onToggleTheme}
            className="mt-2 self-end w-9 h-9 rounded-full border border-line bg-bg-2 text-ink inline-flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
