import { motion } from "framer-motion";
import { socials } from "@/constants";
import MetaLabel from "./ui/MetaLabel";

export default function SocialList() {
  return (
    <ul className="list-none m-0 p-0 border-t border-line">
      {socials.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
          className="border-b border-line"
        >
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
        </motion.li>
      ))}
    </ul>
  );
}
