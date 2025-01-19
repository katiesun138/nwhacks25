import { twMerge } from "tailwind-merge";

export default function Section({
  children,
  className,
  bg,
  id
}: {
  children?: React.ReactNode;
  className?: string;
  bg?: string;
  id?: string
}) {
  return (
    <div
      className={twMerge(
        `${bg ? bg : ""} w-full flex flex-col items-center justify-center gap-3 h-full`
      )}
    >
      <section
      id={id}
        className={twMerge(
          `max-w-screen-xl w-full px-6 lg:px-4 flex flex-col gap-3 h-full `,
          className
        )}
      >
        {children}
      </section>
    </div>
  );
}
