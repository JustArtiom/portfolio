import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import MetaLabel from "./ui/MetaLabel";
import { site } from "@/constants";

export default function EmailPlate() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ y: -2, borderColor: "var(--color-accent)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-3.5 px-5 py-3.5 border border-line rounded-xl glass text-ink mb-8 cursor-pointer"
    >
      <span className="text-accent inline-flex w-5 h-5">
        <Mail className="w-full h-full" strokeWidth={1.6} />
      </span>
      <span className="font-mono text-[15px]">{site.email}</span>
      <span className="pl-3.5 border-l border-line">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            <MetaLabel>{copied ? "copied" : "click to copy"}</MetaLabel>
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
