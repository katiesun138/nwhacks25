import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

export default function TextAreaForm({
  changeTopic,
  labelText,
  placeholderText,
}: {
  changeTopic: (value: string) => void;
  labelText?: string;
  placeholderText?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(inputValue === ""){ setError(true); return; }
    setError(false);
    changeTopic(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 outline-none">
      <Input
        error={error}
        label={labelText}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setInputValue(e.currentTarget.value);
        }}
        placeholderText={placeholderText}
      />
      <div className="w-full flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
