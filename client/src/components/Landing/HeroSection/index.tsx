import Button from "../../Button";
import { motion } from "motion/react";
import GradientSection from "../Gradient";
export default function HeroSection() {
  return (
    <GradientSection 
      className="w-full min-h-[80dvh] md:min-h-[100dvh] h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="flex flex-col gap-3 h-full">
          <motion.h1
            className="text-5xl font-bold text-pretty leading-tight"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: .1 }}
          >
            onTrack, your track to stay on the rails.
          </motion.h1>
          <motion.blockquote
            className="text-lg text-pretty"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Provides users a way to stay focused while browsing through the web
            and to accomplish their tasks without distractions.
          </motion.blockquote>
          <div className="flex gap-3">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.7 }}
            >
            <Button>Get Started</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: .8 }}
            >
            <Button className="bg-bg-primary text-primary hover:bg-bg-dark">Learn More</Button>
          </motion.div>
            </div>
        </div>
        <div className="flex items-end justify-end">
        HELLO
        </div>
      </div>
    </GradientSection>
  );
}
