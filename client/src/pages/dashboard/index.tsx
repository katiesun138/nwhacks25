import BentoGrid from "../../components/BentoGrid";
import { useEffect, useState } from "react";
import ChangeTopic from "../../components/ChangeSetting/Topic";
import ChangeDifficulty from "../../components/ChangeSetting/Difficulty";
import { motion } from "motion/react";
function Dashboard() {
  const [extensionActivated, setExtensionActivated] = useState(
    localStorage.getItem("extensionActivated") === "true"
  );

  useEffect(() => {
    setExtensionActivated(true);
    localStorage.setItem("extensionActivated", extensionActivated.toString());
  }, [extensionActivated]);

  const items = [
    <div>
      <h2 className="text-4xl font-bold">Welcome to onTrack!</h2>
    </div>,
    <div className="flex flex-col gap-2">
      <ChangeTopic />
    </div>,
    <div className="flex flex-col gap-2"></div>,
    <ChangeDifficulty />,
    <div></div>,
    <div></div>,
    <div></div>,
    <div></div>,
    <div></div>,
  ];
  return (
    <>
      <motion.div
        className="w-full lg:h-[100dvh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full p-4 flex flex-col justify-center items-center gap-3 max-w-screen-xl h-full">
          <BentoGrid items={items} />
        </div>
      </motion.div>
    </>
  );
}

export default Dashboard;
