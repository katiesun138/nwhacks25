import { useState } from "react";
import TextAreaForm from "../../Form/TextAreaForm";
export default function ChangeTopic() {
  const [currentTopic, setCurrentTopic] = useState(
    localStorage.getItem("currentTopic") || "You have not selected any topic"
  );
  
  function changeTopic(value: string) {
    setCurrentTopic(value);
    localStorage.setItem("currentTopic", value);
    // SEND API REQUEST TO NEW TOPIC
  }

  return (
    <>
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
    </>
  );
}
