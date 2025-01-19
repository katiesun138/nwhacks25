import Section from "../../Section";
import {
  FaCalendarCheck,
  FaCalendarXmark,
  FaCalendarWeek,
} from "react-icons/fa6";
import { motion } from "motion/react";
import Popup from "../../../pages/Popup";
export default function InfoSection() {

    const items = [
        {
            content: <FaCalendarCheck />,
            heading: "Set your goals",
            description: "Focus on your goals and work towards them."
        },
        {
            content: <FaCalendarXmark />,
            heading: "Stay on track",
            description: "Get notified when you're off track and get back on it."
        },
        {
            content: <FaCalendarWeek />,
            heading: "Track your progress",
            description: "Get a detailed report of your progress and time spent on each task."
        },
    ]
  return (
    <Section className="md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8" id="features">
      <div className="flex flex-col gap-1">
        <motion.h2
          className="font-semibold text-2xl text-pretty"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Chrome extension incorporating LLM, for an experience free of
          distractions.
        </motion.h2>
        <motion.blockquote
          className="text-gray-700 text-lg"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Your track, your goals.
        </motion.blockquote>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-pretty col-span-2">

    {items.map((item, index) => (
        <InfoItem
            key={index}
            content={item.content}
            heading={item.heading}
            description={item.description}
            index={index}
        />
    ))}
      </div>
      <div className="col-span-4 flex justify-center w-full relative overflow-x-scroll md:overflow-hidden">
        <div className="w-full md:w-10/12 lg:w-1/2">
        <Popup />
        </div>
      </div>
    </Section>
  );
}

function InfoItem({
    content,
    heading,
    description,
    index
}: {
    content: React.ReactElement;
    heading: string;
    description: string;
    index: number,
}) {
    return (
        <motion.div
            className="flex flex-col gap-1 md:gap-2 rounded-xl px-1"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: .3 + index * 0.2 }}
        >
            <p className="text-3xl text-primary">{content}</p>
            <h2 className="font-semibold text-xl">{heading}</h2>
            <p>{description}</p>
        </motion.div>
    );
}
