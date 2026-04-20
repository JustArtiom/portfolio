import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Mail } from "lucide-react";
import SectionHead from "./SectionHead";
import { site, socials } from "@/constants";
import { cn } from "@/utils/cn";
import {
  motionProps,
  staggerChild,
  staggerOnScroll,
} from "@/utils/motion";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const copy = () => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

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

  const inputClass =
    "font-sans text-[15px] px-3.5 py-3 border border-line rounded-lg bg-bg text-ink disabled:opacity-60 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_18%,transparent)] transition-all";

  return (
    <section
      id="contact"
      className="max-w-page mx-auto px-5 md:px-10 pt-[134px] pb-[120px] scroll-mt-[100px]"
    >
      <SectionHead num="04" title="Get in touch" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 md:pl-[84px] items-start">
        {/* Lead */}
        <motion.div {...staggerOnScroll(0.1)}>
          <motion.h2
            variants={staggerChild({ side: "left", distance: 30 })}
            className="text-[clamp(36px,4.5vw,56px)] leading-none tracking-[-0.03em] m-0 mb-5 font-medium text-balance"
          >
            Got a project in mind,
            <br />
            or just want to say hi?
          </motion.h2>
          <motion.p
            variants={staggerChild({ side: "left", distance: 24 })}
            className="text-[17px] text-muted max-w-[42ch] m-0 mb-7"
          >
            Drop a message below — it lands directly in my inbox. Reply times
            are usually under a day.
          </motion.p>

          <motion.button
            variants={staggerChild({ side: "left", distance: 24 })}
            onClick={copy}
            whileHover={{ y: -2, borderColor: "var(--color-accent)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3.5 px-5 py-3.5 border border-line rounded-xl glass text-ink mb-8 cursor-pointer"
          >
            <span className="text-accent inline-flex w-5 h-5">
              <Mail className="w-full h-full" strokeWidth={1.6} />
            </span>
            <span className="font-mono text-[15px]">{site.email}</span>
            <span className="font-mono text-[11px] text-muted uppercase tracking-wider pl-3.5 border-l border-line">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {copied ? "copied" : "click to copy"}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.button>

          <motion.ul
            variants={staggerChild({ side: "left", distance: 24 })}
            className="list-none m-0 p-0 border-t border-line"
          >
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
                  <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="text-[15px]">{s.handle}</span>
                  <span className="text-muted transition-all group-hover:text-accent group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          noValidate
          {...motionProps({ side: "right", distance: 40 })}
          className="border border-line rounded-2xl glass p-7 flex flex-col gap-3.5"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted uppercase tracking-wider pb-3.5 border-b border-line mb-1">
            <motion.span
              className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>Send a message</span>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Your name
            </span>
            <input
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder="Jane Doe"
              required
              disabled={status === "sending"}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="jane@company.com"
              required
              disabled={status === "sending"}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Message
            </span>
            <textarea
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="Tell me a little about what you're building, timelines, scope…"
              required
              disabled={status === "sending"}
              className={cn(inputClass, "resize-y min-h-[110px] leading-normal")}
            />
          </label>

          <div className="flex items-center gap-4 justify-between flex-wrap mt-1.5">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { y: -2 } : {}}
              whileTap={status !== "sending" ? { scale: 0.97 } : {}}
              className="group inline-flex items-center gap-2.5 px-5.5 py-3.5 rounded-full bg-ink text-bg text-[15px] border border-transparent transition-colors hover:bg-accent dark:hover:text-white disabled:opacity-70 disabled:cursor-wait cursor-pointer"
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
            </motion.button>
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
      </div>
    </section>
  );
}
