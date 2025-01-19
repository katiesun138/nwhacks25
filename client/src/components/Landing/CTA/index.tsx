import Button from "../../Button";
import Section from "../../Section";
import { motion } from "motion/react";
export default function CTASection() {
  return (
    <Section className="text-center flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-3 items-center"
      >
        <h1 className="text-4xl font-bold">Try onTrack</h1>
        Check out onTrack and start your journey to success today!
        <Button className="">Download</Button>
      </motion.div>
    </Section>
  );
}
