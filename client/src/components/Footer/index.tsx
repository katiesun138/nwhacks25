import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export default function Footer() {
    const container = useRef<HTMLDivElement | null>(null);
    const paths = useRef<(SVGTextPathElement | null)[]>([]);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });

    useEffect(() => {
        scrollYProgress.on("change", (e) => {
            paths.current.forEach((path, i) => {
                if (path) {
                    path.setAttribute("startOffset", -40 + i * 40 + e * 40 + "%");
                }
            });
        });
    }, [scrollYProgress]);

    return (
      <div ref={container} className="w-full">
        <svg className="w-full mb-40" viewBox="0 0 250 105">
          <path
            fill="none"
            id="curve"
            d="m0,103.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
          />

          <text className="text-[6px] uppercase">
            {[...Array(3)].map((_, i) => {
              return (
            <textPath
              key={i}
              ref={(ref) => (paths.current[i] = ref)}
              startOffset={i * 43 + "%"}
              href="#curve"
            >
              Achieve your goals with onTrack
            </textPath>
              );
            })}
          </text>
        </svg>

        <Name scrollProgress={scrollYProgress} />
      </div>
    );
}

function Name ({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const y = useTransform(scrollProgress, [0, 1], [-225, 0]);
    return (
        <div className="h-[200px] bg-bg-dark overflow-hidden mt-4">
            <motion.div
            initial={{ opacity:0 }}
            whileInView={{ opacity: 1 }}
                style={{ y }}
                className="h-full bg-bg-dark text-pretty text-2xl font-bold flex justify-center gap-10 items-center p-5"
            >
                onTrack @ nwHacks 2025
            </motion.div>
        </div>
    );
};
