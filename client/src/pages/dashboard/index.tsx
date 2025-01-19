import BentoGrid from "../../components/BentoGrid";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import ChangeTopic from "../../components/ChangeSetting/Topic";
import ChangeDifficulty from "../../components/ChangeSetting/Difficulty";
function Dashboard() {
  const [extensionActivated, setExtensionActivated] = useState(
    localStorage.getItem("extensionActivated") === "true"
  );

  useEffect(() => {
    setExtensionActivated(true);
    localStorage.setItem("extensionActivated", extensionActivated.toString());
  }, [extensionActivated]);

  const items = [
    <div className="flex flex-col gap-2">
      <ChangeTopic/>
    </div>,
    <ChangeDifficulty/>,
    <div></div>,
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Welcome</h2>
      <Button
        onClick={() => {
          setExtensionActivated(!extensionActivated);
        }}
      >
        {extensionActivated ? "Pause" : "Activate"}
      </Button>
    </div>,
    <div></div>,
    <div></div>,
    <div></div>,
  ];
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full p-4 flex flex-col gap-3 max-w-screen-2xl ">
          <div className="flex flex-col w-full gap-1">
            <h1 className="font-bold text-4xl">onTrack</h1>
            <h2 className="text-xl">Settings</h2>
          </div>
          <BentoGrid items={items} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
