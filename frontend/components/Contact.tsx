import { motion } from "framer-motion";
import Section from "./ui/Section";
import EmailPlate from "./EmailPlate";
import SocialList from "./SocialList";
import ContactForm from "./ContactForm";
import { reveal } from "@/utils/motion";

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch" className="pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
        <motion.div {...reveal}>
          <p className="text-xl leading-[1.55] text-ink-2 max-w-[38ch] m-0 mb-8 text-pretty">
            Send a message below. It goes straight to me. I usually reply
            within a day.
          </p>

          <EmailPlate />
          <SocialList />
        </motion.div>

        <ContactForm />
      </div>
    </Section>
  );
}
