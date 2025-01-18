import Button from "./components/Button";
import SelectForm from "./components/Form/SelectForm";
import TextAreaForm from "./components/Form/TextAreaForm";
import { useEffect, useState } from "react";

function App() {
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

  return (
    <>
      <div className="container mx-auto py-5 px-5 flex flex-col gap-3 rounded-lg border-2 min-w-[500px]">
        {/* <nav className="flex justify-end gap-2">
          <button onClick={()=>{}}>x</button>
        </nav> */}
        <div className="text-center">
          <h1 className="font-bold text-4xl">OnTrack</h1>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Current topic is:</h2>
          <blockquote className="text-gray-700">{currentTopic}</blockquote>
        </div>
        <div className="">
          <TextAreaForm
            changeTopic={changeTopic}
            labelText="Please enter a description of the topic you want to focus on:"
          />
        </div>
        <div>
          <SelectForm
            currentDifficulty={currentDifficulty}
            onChange={changeDifficulty}
          />
        </div>
        <div className="w-full justify-end flex">
          <Button
            onClick={() => {
              setExtensionActivated(!extensionActivated);
            }}
          >
            {extensionActivated ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
