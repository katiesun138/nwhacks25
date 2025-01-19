import Footer from "../../components/Footer";
import HeroSection from "../../components/Landing/HeroSection";
import Section from "../../components/Section";
import InfoSection from "../../components/Landing/InfoSection";
import CTASection from "../../components/Landing/CTA";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../../components/NavBar";

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
      <div className="w-full flex flex-col items-center justify-center gap-4">
      <HeroSection />
      <InfoSection/>
      <Section className="">
      </Section>
      <CTASection />
      <Footer />
      </div>
    </>
  );
}

export default LandingPage;
