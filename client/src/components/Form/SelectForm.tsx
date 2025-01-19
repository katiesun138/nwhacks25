export default function SelectForm({
  onChange,
  currentDifficulty,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentDifficulty: string
}) {
  return (
    <div className="w-full flex flex-col gap-2">
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
  checked
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name:string;
  id:string;
  checked:boolean
}) {
  return (
    <label className="text-gray-700 flex gap-4">
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
  );
}
