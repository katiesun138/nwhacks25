import { useState } from "react";
import SelectForm from "../../Form/SelectForm";
export default function ChangeDifficulty() {
  const [currentDifficulty, setCurrentDifficulty] = useState(
    localStorage.getItem("difficulty") || "hard"
  );

  function changeDifficulty(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentDifficulty(event.currentTarget.id);
    localStorage.setItem("difficulty", event.currentTarget.id);
    // CHANGE ON FAILURE BEHAVIOUR
  }
  return (
    <>
      <SelectForm
        description="Please select the difficulty level:"
        currentDifficulty={currentDifficulty}
        onChange={changeDifficulty}
      />
    </>
  );
}
