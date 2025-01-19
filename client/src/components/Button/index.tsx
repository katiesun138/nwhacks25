import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  onClick,
  className,
  type = "button",
  primary = true,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `flex gap-2 py-2 px-5 font-medium border-2 
        ${`${
          primary
            ? "text-white border-primary-light border-t-primary-light border-r-primary-dark border-b-primary-dark bg-primary hover:bg-primary-dark"
            : "text-black border-bg-primary border-t-bg-light border-r-bg-dark border-b-bg-dark bg-bg-primary hover:bg-bg-dark"
        }`}  rounded-xl w-max transition-all ` + className
      )}
      type={type}
    >
      {children}
    </button>
  );
}
