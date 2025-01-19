import Button from "../../Button";
import { motion } from "motion/react";
import GradientSection from "../Gradient";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Spline from "./Spline";
gsap.registerPlugin(ScrollToPlugin);
export default function HeroSection({ onExit }: { onExit: () => void }) {
  const scrollToFeatures = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#features", offsetY: 80 },
    });
  };
  return (
    <GradientSection className="w-full min-h-[80dvh] md:min-h-[100dvh]">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-5 w-full">
        <div className="flex flex-col gap-4 h-full">
          <motion.h1
            className="text-5xl font-bold text-pretty leading-tight"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className=" text-blue-950">onTrack</span>, your path to stay on the rails.
          </motion.h1>
          <motion.blockquote
            className="text-lg text-pretty"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            onTrack provides users with a way to stay focused while browsing the
            web and accomplish their goals without distractions.
          </motion.blockquote>
          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.7 }}
            >
              <motion.div>
                <Button className="w-full" onClick={onExit}>
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.8 }}
            >
              <Button primary={false} onClick={scrollToFeatures}>
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="flex items-end justify-end relative w-full h-full">
          <Spline />
        </div>
      </div>
    </GradientSection>
  );
}
