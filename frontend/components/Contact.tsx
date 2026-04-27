import { motion } from "framer-motion";
import Section from "./ui/Section";
import EmailPlate from "./EmailPlate";
import SocialList from "./SocialList";
import ContactForm from "./ContactForm";
import { staggerChild, staggerOnScroll } from "@/utils/motion";

export default function Contact() {
  return (
    <Section
      id="contact"
      num="04"
      title="Get in touch"
      className="pb-[120px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 md:pl-[84px] items-start">
        <motion.div {...staggerOnScroll(0.1)}>
          <motion.h3
            variants={staggerChild({ side: "left", distance: 30 })}
            className="text-[clamp(36px,4.5vw,56px)] leading-none tracking-[-0.03em] m-0 mb-5 font-medium text-balance"
          >
            Got a project in mind,
            <br />
            or just want to say hi?
          </motion.h3>
          <motion.p
            variants={staggerChild({ side: "left", distance: 24 })}
            className="text-[17px] text-muted max-w-[42ch] m-0 mb-7"
          >
            Send a message below — it goes straight to me. I usually reply
            within a day.
          </motion.p>

          <motion.div variants={staggerChild({ side: "left", distance: 24 })}>
            <EmailPlate />
          </motion.div>

          <motion.div variants={staggerChild({ side: "left", distance: 24 })}>
            <SocialList />
          </motion.div>
        </motion.div>

        <ContactForm />
      </div>
    </Section>
  );
}
