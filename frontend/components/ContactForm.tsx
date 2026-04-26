import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { TextField, TextareaField } from "./ui/Field";
import MetaLabel from "./ui/MetaLabel";
import SubmitButton from "./SubmitButton";
import { site } from "@/constants";
import { motionProps } from "@/utils/motion";
import { cn } from "@/utils/cn";

export type ContactStatus = "idle" | "sending" | "sent" | "error";

function collectClientMeta() {
  try {
    const dpr = window.devicePixelRatio || 1;
    return {
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lang: navigator.language,
      langs: navigator.languages?.slice(0, 6).join(","),
      screen: `${window.screen.width}x${window.screen.height}@${dpr}x`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      referrer: document.referrer,
    };
  } catch {
    return {};
  }
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    try {
      await axios.post("/api/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        source: site.domain,
        ...collectClientMeta(),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      const msg =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : `Couldn't send. Please email me directly — ${site.email}`;
      setErrorMsg(msg);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      noValidate
      {...motionProps({ side: "right", distance: 40 })}
      className="border border-line rounded-2xl glass p-7 flex flex-col gap-3.5"
    >
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-line mb-1">
        <motion.span
          className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <MetaLabel>Send a message</MetaLabel>
      </div>

      <TextField
        label="Your name"
        type="text"
        value={form.name}
        onChange={update("name")}
        placeholder="Jane Doe"
        required
        disabled={status === "sending"}
      />
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={update("email")}
        placeholder="jane@company.com"
        required
        disabled={status === "sending"}
      />
      <TextareaField
        label="Message"
        value={form.message}
        onChange={update("message")}
        placeholder="Tell me a little about what you're building, timelines, scope…"
        required
        disabled={status === "sending"}
      />

      <div className="flex items-center gap-4 justify-between flex-wrap mt-1.5">
        <SubmitButton status={status} />
        <AnimatePresence mode="wait">
          <motion.span
            key={status + errorMsg}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "font-mono text-[11px] uppercase tracking-wider text-right",
              status === "idle" && "text-muted",
              status === "sent" && "text-[oklch(0.55_0.15_145)]",
              status === "sending" && "text-muted",
              status === "error" &&
                "text-accent normal-case tracking-normal font-sans text-[13px]"
            )}
          >
            {status === "sent" && "Message sent — I'll reply soon."}
            {status === "error" && errorMsg}
            {status === "idle" && "I read every message."}
            {status === "sending" && "Relaying to Discord…"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
