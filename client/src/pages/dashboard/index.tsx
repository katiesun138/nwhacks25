import BentoGrid from "../../components/BentoGrid";
import SelectForm from "../../components/Form/SelectForm";
import TextAreaForm from "../../components/Form/TextAreaForm";
import { useEffect, useState } from "react";

function Dashboard() {
  const [currentTopic, setCurrentTopic] = useState(
    localStorage.getItem("currentTopic") || "You have not selected any topic"
  );

  const [currentDifficulty, setCurrentDifficulty] = useState(
    localStorage.getItem("difficulty") || "medium"
  );

  const [extensionActivated, setExtensionActivated] = useState(
    localStorage.getItem("extensionActivated") === "true"
  );

  useEffect(() => {
    setExtensionActivated(true);
    localStorage.setItem("extensionActivated", extensionActivated.toString());
  }, [extensionActivated]);

  function changeTopic(value: string) {
    setCurrentTopic(value);
    localStorage.setItem("currentTopic", value);
    // SEND API REQUEST TO NEW TOPIC
  }

  function changeDifficulty(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentDifficulty(event.currentTarget.id);
    localStorage.setItem("difficulty", event.currentTarget.id);
    // CHANGE ON FAILURE BEHAVIOUR
  }

  const items = [
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-lg">Current topic is:</h2>
        <blockquote className="text-gray-700">{currentTopic}</blockquote>
      </div>
      <TextAreaForm
        changeTopic={changeTopic}
        labelText="Please enter a description of the topic you want to focus on:"
      />
    </div>,
    <SelectForm
      description="Please select the difficulty level:"
      currentDifficulty={currentDifficulty}
      onChange={changeDifficulty}
    />,
    <div></div>,
    <div></div>,
    <div></div>,
    <div></div>,
    <div></div>,
  ];
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full p-4 flex flex-col gap-3 max-w-screen-2xl ">
          <div className="flex flex-col w-full gap-1">
            <h1 className="font-bold text-4xl">OnTrack</h1>
            <h2 className="text-xl">Settings</h2>
          </div>
          <BentoGrid items={items} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
