import { motion } from "motion/react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
export default function NavBar() {
  const [optionsPageUrl, setOptionsPageUrl] = useState("");

  useEffect(() => {
    const url = chrome.runtime?.getURL
      ? chrome.runtime.getURL("options.html")
      : // INSERT WEBSITE LINK INSTEAD
        "#";
    setOptionsPageUrl(url);
  }, []);

  const handleHomeClick = () => {
    gsap.to(window, { duration: 0.5, scrollTo: "#home" });
  };
  const handleFeaturesClick = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: "#features", offsetY: 100 },
    });
  };
  return (
    <motion.nav
      className="w-full fixed flex items-center justify-center z-[1000] "
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex bg-bg-dark rounded-xl items-center gap-4 max-w-screen-xl w-full justify-between py-4 mt-2 px-6 lg:px-4">
        <h2
          onClick={() => handleHomeClick()}
          className="text-2xl font-bold cursor-pointer"
        >
          onTrack
        </h2>
        <ul className="flex gap-4 md:gap-8">
          <li onClick={() => handleHomeClick()}>
            <p title="Home" className="text-lg cursor-pointer">
              Home
            </p>
          </li>
          <li onClick={() => handleFeaturesClick()}>
            <p title="Features" className="text-lg cursor-pointer">
              Features
            </p>
          </li>
          <li>
            <a href={optionsPageUrl} className="text-lg">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
