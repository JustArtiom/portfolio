import dateFormat from "dateformat";
import { motion } from "framer-motion";
import Chip from "./ui/Chip";
import { cn } from "@/utils/cn";
import { reveal } from "@/utils/motion";
import type { ClientWork, RoadmapItem, Skill } from "@/constants";

function dateRange(from: Date, to?: Date) {
  const end = to ? dateFormat(to, "mmm yyyy") : "Present";
  return `${dateFormat(from, "mmm yyyy")} - ${end}`;
}

function OrgLink({ name, website }: { name: string; website?: string }) {
  if (!website) return <span>{name}</span>;
  return (
    <a href={website} target="_blank" rel="noreferrer" className="prose-link">
      {name}
    </a>
  );
}

function Bullets({
  items,
  className,
}: {
  items?: string[];
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <ul
      className={cn(
        "list-disc m-0 mb-3.5 pl-5 marker:text-faint text-base max-w-[68ch]",
        className
      )}
    >
      {items.map((b, i) => (
        <li key={i} className="pl-1 py-0.5 text-ink-2">
          {b}
        </li>
      ))}
    </ul>
  );
}

function SkillChips({ skills }: { skills?: Skill[] }) {
  if (!skills?.length) return null;
  return (
    <div className="flex gap-1.5 flex-wrap">
      {skills.map((s) => (
        <Chip key={s.name} icon={s.icon} variant="mono">
          {s.name}
        </Chip>
      ))}
    </div>
  );
}

/**
 * Git-style S-curve that splits off the role's timeline line and runs into
 * the first client's dot, stopping short of it like the other connectors.
 *
 * Horizontal span, measured from the client column's left edge:
 * - the role line is centred in the role's dot column (24px, md 40px) and
 *   sits before the role grid gap (gap-4, md gap-6)
 * - the client dot is centred in its 16px column: +8px
 * Gaps are rem based, so they go through --spacing instead of fixed px.
 */
function BranchCurve() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "absolute bottom-full h-10 md:h-12 overflow-visible pointer-events-none",
        "left-[calc(-12px_-_var(--spacing)*4)] w-[calc(20px_+_var(--spacing)*4)]",
        "md:left-[calc(-20px_-_var(--spacing)*6)] md:w-[calc(28px_+_var(--spacing)*6)]"
      )}
    >
      <path
        d="M0 0 C0 50 100 50 100 100"
        fill="none"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        className="stroke-line"
      />
    </svg>
  );
}

function ClientEntry({
  client,
  isLast,
  branch,
}: {
  client: ClientWork;
  isLast: boolean;
  branch: boolean;
}) {
  return (
    <li
      className={cn(
        "relative grid grid-cols-[16px_1fr] gap-3 md:gap-4",
        !isLast && "pb-8"
      )}
    >
      {branch && <BranchCurve />}
      <div className="flex flex-col items-center pt-1.5">
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full border-2 shrink-0",
            client.to ? "bg-bg border-ink" : "bg-accent border-accent"
          )}
        />
        {!isLast && <span className="flex-1 w-px bg-line mt-2" />}
      </div>

      <div>
        <div className="text-sm text-muted mb-1">
          {dateRange(client.from, client.to)}
        </div>
        <h4 className="m-0 text-lg font-medium tracking-[-0.01em]">
          <OrgLink name={client.name} website={client.website} />
        </h4>
        {client.about && (
          <p className="m-0 mt-0.5 mb-2.5 text-[15px] text-muted">
            {client.about}
          </p>
        )}
        {client.links && client.links.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {client.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] px-2.5 py-1 border border-line rounded-full transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        <Bullets items={client.highlights} className="text-[15px]" />
        <SkillChips skills={client.skills} />
      </div>
    </li>
  );
}

export default function TimelineItem({
  item,
  isLast,
}: {
  item: RoadmapItem;
  isLast: boolean;
}) {
  // Most recent first: ongoing clients, then by end date, then by start date.
  const end = (c: ClientWork) => c.to?.getTime() ?? Infinity;
  const clients = [...(item.clients ?? [])].sort(
    (a, b) => end(b) - end(a) || b.from.getTime() - a.from.getTime()
  );

  return (
    <motion.li
      {...reveal}
      className={cn(
        "grid grid-cols-[24px_1fr] md:grid-cols-[40px_1fr] gap-4 md:gap-6 relative",
        !isLast && "pb-12"
      )}
    >
      <div className="flex flex-col items-center pt-1.5">
        <span
          className={cn(
            "w-3 h-3 rounded-full border-2 shrink-0 relative z-10",
            item.active ? "bg-accent border-accent" : "bg-bg border-ink"
          )}
        />
        {!isLast && <span className="flex-1 w-px bg-line mt-2 min-h-[30px]" />}
      </div>

      <div>
        <div className="text-sm text-muted mb-1.5 flex gap-2 items-baseline flex-wrap">
          <span>{dateRange(item.from, item.to)}</span>
          <span className="text-faint">·</span>
          <span>{item.location}</span>
        </div>

        <h3 className="text-2xl tracking-[-0.015em] m-0 mb-3.5 font-medium flex flex-wrap gap-x-2 items-baseline">
          {item.title}
          {item.company && (
            <span className="inline-flex items-baseline gap-2">
              <span className="text-muted font-normal">at</span>
              <OrgLink
                name={item.company.name}
                website={item.company.website}
              />
            </span>
          )}
        </h3>

        <Bullets items={item.learned} />
        <SkillChips skills={item.skills} />

        {clients.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-[16px_1fr] gap-3 md:gap-4 mb-4">
              <p className="col-start-2 m-0 text-sm text-muted">
                Client projects
              </p>
            </div>
            <ul className="list-none m-0 p-0">
              {clients.map((c, i) => (
                <ClientEntry
                  key={c.name}
                  client={c}
                  isLast={i === clients.length - 1}
                  branch={i === 0}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.li>
  );
}
