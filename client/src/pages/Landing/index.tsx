import Footer from "../../components/Footer";
import HeroSection from "../../components/Landing/HeroSection";
import Section from "../../components/Section";
import InfoSection from "../../components/Landing/InfoSection";
import CTASection from "../../components/Landing/CTA";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../../components/NavBar";
import { motion } from "motion/react";
function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: DOMHighResTimeStamp): void {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const [pageTransition, setPageTransition] = useState(false);
  const onPageTransition = () => {
    setPageTransition(true);
    setTimeout(() => {
      window.location.href = "/options";
    }, 1500);
  };
  return (
    <>
      <NavBar />
      <motion.div
        className="w-full flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: pageTransition ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection onExit={onPageTransition} />
        <InfoSection />
        <Section className=""></Section>
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
}

export default LandingPage;
