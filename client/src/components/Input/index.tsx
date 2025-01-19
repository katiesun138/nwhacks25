import { twMerge } from "tailwind-merge"

export default function TextArea({
  className,
  value,
  placeholderText = "Enter description of the task",
  onChange,
  label = "Please enter description"
}: {
  className?: string;
  value?: string;
  placeholderText?: string;
  onChange: (event:React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string
}) {
  return (
    <>
    <label className="font-semibold">{label}</label>
      <textarea
        rows={3}
        cols={50}
        className={twMerge(`p-2 w-full rounded-xl border-2 ` + className)}
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
      ></textarea>
    </>
  );
}

