import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `flex gap-2 py-2 px-5 text-white font-medium border-2 border-primary-light border-t-primary-light border-r-primary-dark border-b-primary-dark bg-primary rounded-xl w-max transition-all hover:bg-primary-dark ` +
          className
      )}
      type={type}
    >
      {children}
    </button>
  );
}

