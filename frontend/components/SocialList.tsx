import { socials } from "@/constants";
import MetaLabel from "./ui/MetaLabel";

export default function SocialList() {
  return (
    <ul className="list-none m-0 p-0 border-t border-line">
      {socials.map((s) => (
        <li key={s.label} className="border-b border-line">
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-[90px_1fr_auto] gap-4 items-baseline py-4 px-2 transition-all hover:text-accent hover:pl-4 group"
          >
            <MetaLabel>{s.label}</MetaLabel>
            <span className="text-[15px]">{s.handle}</span>
            <span className="text-muted transition-all group-hover:text-accent group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
