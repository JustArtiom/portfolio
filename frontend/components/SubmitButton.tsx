import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";
import type { ContactStatus } from "./ContactForm";

export default function SubmitButton({ status }: { status: ContactStatus }) {
  return (
    <Button
      type="submit"
      disabled={status === "sending"}
      className="disabled:cursor-wait"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "sending" ? (
          <motion.span
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <motion.span
              className="w-3 h-3 rounded-full border-2 border-bg/40 border-t-bg"
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            Sending…
          </motion.span>
        ) : status === "sent" ? (
          <motion.span
            key="sent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            ✓ Sent
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            Send message
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
