import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence, useMotionValue } from "motion/react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const x = useMotionValue(0);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // const halfWidth = event.currentTarget.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX);
    },
    [x]
  );

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <label
          className={twMerge(
            `text-gray-700 flex gap-3 hover:border-l-primary-light hover:bg-bg-dark rounded-md border-l-[.2rem] py-1 px-3 transition-all border-l-transparent ${
              checked ? "bg-bg-light border-l-primary" : ""
            }`
          )}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
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
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex w-full items-center pointer justify-center gap-2 py-2 rounded-md"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setShowImage(true)}
                  onMouseLeave={() => setShowImage(false)}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </label>
      </AnimatePresence>

      {/* Video Tooltip */}
      <AnimatePresence mode="popLayout">
        {showImage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                stiffness: 260,
                damping: 10,
                duration: 0.3,
              },
              width: "200px",
              height: "auto",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: x,
            }}
            className="absolute top-full mt-2 z-50"
          >
            <motion.div className="rounded-md overflow-hidden ">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ZK-rNEhJIDs?si=KBECTf4W-b_37Xsn&amp;autoplay=1&mute=1&controls=0"
                title="YouTube video player"
                className="w-full h-full object-cover rounded-md border-[1px] border-white ring-1 ring-black/5"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
