import { cn } from "@/utils/cn";

export type NavLink = { id: string; label: string; num: string };

type Props = {
  links: readonly NavLink[];
  activeId: string;
  onNav: (id: string) => void;
  orientation?: "horizontal" | "vertical";
};

export default function NavLinks({
  links,
  activeId,
  onNav,
  orientation = "horizontal",
}: Props) {
  const vertical = orientation === "vertical";
  return (
    <ul
      className={cn(
        "list-none m-0 p-0 flex",
        vertical ? "flex-col gap-1" : "items-center gap-1"
      )}
    >
      {links.map((l) => {
        const active = activeId === l.id;
        return (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNav(l.id);
              }}
              className={cn(
                "inline-flex items-baseline gap-1.5 transition-colors",
                vertical
                  ? "px-3 py-3 rounded-lg text-[15px]"
                  : "px-3.5 py-2 rounded-full text-sm",
                active
                  ? vertical
                    ? "text-ink bg-bg-2"
                    : "text-ink"
                  : "text-muted hover:text-ink" + (vertical ? "" : " hover:bg-bg-2")
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
          </li>
        );
      })}
    </ul>
  );
}
