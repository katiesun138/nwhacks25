import { motion, } from "motion/react";
export default function NavBar() {
  return (
    <motion.nav
      className="w-full fixed flex items-center justify-center z-[1000] "
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex bg-bg-dark rounded-xl items-center gap-4 max-w-screen-xl w-full justify-between py-4 mt-2 px-6 lg:px-4">
        <h2 className="text-2xl font-bold">onTrack</h2>
        <ul className="flex gap-8">
          <li>
            <a href="#home" className="text-lg">
              Home
            </a>
          </li>
          <li>
            <a href="#features" className="text-lg">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="text-lg">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
