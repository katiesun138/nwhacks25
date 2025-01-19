import Button from "../../Button";
import Section from "../../Section";
import { motion } from "motion/react";
export default function CTASection() {
  return (
    <Section className="text-center flex items-center mt-8 -mb-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-3 items-center"
      >
        <h1 className="text-4xl font-bold">Try out onTrack</h1>
        Check out onTrack and start your journey to less procrastination today!
        <a
          href="https://github.com/katiesun138/nwhacks25/packages"
          target="_blank"
          rel="noreferrer"
        >
          <Button primary className="">Download</Button>
        </a>
      </motion.div>
    </Section>
  );
}
