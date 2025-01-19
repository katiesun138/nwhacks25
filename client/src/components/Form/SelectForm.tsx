import { twMerge } from "tailwind-merge";

export default function SelectForm({
  onChange,
  currentDifficulty,
  description,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentDifficulty: string;
  description: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="font-semibold">{description}</h3>
      <RadioInput
        onChange={onChange}
        label="Light (Icon appears on distraction)"
        name="option"
        id="light"
        checked={currentDifficulty === "light"}
      />
      <RadioInput
        onChange={onChange}
        label="Medium (Popup appears on distraction)"
        name="option"
        id="medium"
        checked={currentDifficulty === "medium"}
      />
      <RadioInput
        onChange={onChange}
        label="Hard (Page redirects on distraction)"
        name="option"
        id="hard"
        checked={currentDifficulty === "hard"}
      />
    </div>
  );
}

function RadioInput({
  onChange,
  label,
  name,
  id,
  checked,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  id: string;
  checked: boolean;
}) {

  return (
    <div
      className="relative cursor-pointer"
    >
        <label
          className={twMerge(
            `text-gray-700 flex cursor-pointer gap-3 hover:border-l-primary-light hover:bg-bg-dark rounded-md border-l-[.2rem] py-1 px-3 transition-all border-l-transparent ${
              checked ? "bg-bg-light border-l-primary" : ""
            }`
          )}
        >
          <input
            type="radio"
            name={name}
            value={name}
            id={id}
            onChange={onChange}
            checked={checked}
          />
          <div>{label}</div>
        </label>
    </div>
  );
}
