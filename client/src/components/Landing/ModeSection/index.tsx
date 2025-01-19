import Section from "../../Section";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { useState, useCallback } from "react";

export default function ModeSection() {
    return (
      <Section className="">
        <div className="flex flex-col gap-4">
          <motion.h2 className="font-bold text-2xl" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
            Different levels of procrastination prevention
          </motion.h2>
          <div className="flex flex-col gap-4">
            <ModeItem
              title="Light"
              description="Icon appears on distraction detected"
              image="/hard.png"
            />
            <ModeItem
              title="Medium"
              description="Popup appears on distraction detected"
              image="/hard.png"
            />
            <ModeItem
              title="Hard"
              description="Page redirected on distraction detected"
              image="/hard.png"
            />
          </div>
        </div>
      </Section>
    );
}

function ModeItem({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) {

    const [isHovered, setIsHovered] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const x = useMotionValue(0);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
          x.set(event.nativeEvent.offsetX);
        },
        [x]
      );
    return (
      <motion.div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          <label
            className={twMerge(
              `text-gray-700 flex items-center gap-3 hover:border-l-primary-light hover:bg-bg-dark rounded-md border-l-[.2rem] py-2 px-2 transition-all border-l-transparent text-pretty ${
                isHovered ? "bg-bg-light border-l-primary" : ""
              }`
            )}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <div className="flex gap-2 md:items-center flex-col md:flex-row justify-start">
              <h3 className="font-bold text-xl">{title}:</h3>
              {description}
            </div>
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
                    className="flex w-11/12 items-center pointer justify-center gap-2 h-full px-4 rounded-md"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setShowImage(true)}
                    onMouseLeave={() => setShowImage(false)}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </label>
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {showImage && (
            <motion.div
              initial={{ opacity: 0, y: 1, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  stiffness: 200,
                  damping: 10,
                  duration: 0.4,
                },
                width: "350px",
                height: "auto",
              }}
              exit={{ opacity: 0, y: 15, scale: 0.6 }}
              style={{
                translateX: x,
              }}
              className="absolute top-full mt-1 z-50"
            >
              <motion.div className="rounded-lg border-2 shadow-md overflow-hidden ">
                <img src={image} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
}