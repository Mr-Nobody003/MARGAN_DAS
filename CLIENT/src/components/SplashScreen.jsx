import { motion } from "framer-motion";

const asciiM = [
  "███╗   ███╗",
  "████╗ ████║",
  "██╔████╔██║",
  "██║╚██╔╝██║",
  "██║ ╚═╝ ██║",
  "╚═╝     ╚═╝",
];

const SplashScreen = ({ doodles }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background animated doodle Ms */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {doodles.map((style, i) => (
          <motion.div
            key={i}
            className="absolute text-teal-300 font-mono"
            style={{
              top: style.top,
              left: style.left,
              fontSize: style.fontSize,
              opacity: style.opacity,
              transform: `rotate(${style.rotate}deg)`,
              whiteSpace: "pre",
            }}
            initial={{ y: 0, opacity: style.opacity }}
            animate={{
              y: [0, -5, 0, 5, 0],
              opacity: [style.opacity, style.opacity * 1.3, style.opacity],
            }}
            transition={{
              repeat: Infinity,
              duration: style.duration,
              ease: "easeInOut",
            }}
          >
            M
          </motion.div>
        ))}
      </div>

      {/* Main glowing ASCII M */}
      <motion.pre
        className="relative z-10 text-center text-teal-300 text-[1.1rem] sm:text-[1.4rem] font-bold font-mono"
        style={{
          lineHeight: "1em",
          transformOrigin: "center",
          whiteSpace: "pre",
          letterSpacing: "0.02em",
        }}
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: "drop-shadow(0 0 0px #14b8a6)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: [
            "drop-shadow(0 0 2px #14b8a6)",
            "drop-shadow(0 0 10px #14b8a6)",
            "drop-shadow(0 0 5px #14b8a6)",
          ],
        }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        {asciiM.join("\n")}
      </motion.pre>
    </div>
  );
};

export default SplashScreen;
