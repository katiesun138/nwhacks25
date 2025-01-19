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
        `flex gap-2 py-2 px-4 text-white font-medium bg-primary rounded-lg w-max border border-secondary transition-all hover:bg-primary-dark ` +
          className
      )}
      type={type}
    >
      {children}
    </button>
  );
}