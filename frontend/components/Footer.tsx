import { motion } from "framer-motion";
import { site } from "@/constants";
import { motionProps } from "@/utils/motion";

export default function Footer() {
  return (
    <motion.footer
      {...motionProps({ side: "bottom", distance: 24 })}
      className="border-t border-line py-10 pb-8 mt-10"
    >
      <div className="max-w-page mx-auto px-5 md:px-10 flex flex-col gap-6">
        <div className="flex justify-between items-baseline gap-4 flex-wrap">
          <span className="text-base text-ink-2 prose-em">
            Made with <em className="text-accent">care</em> in London, UK.
          </span>
          <span className="flex gap-2.5 items-baseline font-mono text-xs text-muted flex-wrap">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span className="text-faint">·</span>
            <span>{site.version}</span>
          </span>
        </div>
        <div className="font-mono text-xs text-muted pt-4 border-t border-dashed border-line">
          {"// if you scrolled this far, thank you. seriously."}
        </div>
      </div>
    </motion.footer>
  );
}
