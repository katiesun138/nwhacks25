import Footer from "../../components/Footer";
import HeroSection from "../../components/Landing/HeroSection";
import InfoSection from "../../components/Landing/InfoSection";
import CTASection from "../../components/Landing/CTA";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../../components/NavBar";
import { motion } from "motion/react";
import ModeSection from "../../components/Landing/ModeSection";
function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: DOMHighResTimeStamp): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  
  return (
    <>
      <NavBar />
      <motion.div
        className="w-full flex flex-col items-center overflow-x-hidden justify-center gap-8 md:gap-12"
        // initial={{ opacity: 1 }}
        // animate={{ opacity: pageTransition ? 0 : 1 }}
        // transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <InfoSection />
        <ModeSection />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
}

export default LandingPage;
