import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplashScreen from "./SplashScreen";
import Spline from "@splinetool/react-spline";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [doodles, setDoodles] = useState([]);
  const [robotLoaded, setRobotLoaded] = useState(false);

  const maxTicks = 24;
  const interval = 100;

  const generateDoodles = () => {
    let count = 1000;
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 480) count = 150;
      else if (width < 768) count = 300;
      else if (width < 1024) count = 500;
      else count = 1000;
    }
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        fontSize: Math.floor(Math.random() * 1.2 + 0.6) + "rem",
        opacity: Math.random() * 0.06 + 0.02,
        rotate: Math.random() * 360,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      });
    }
    return items;
  };

  useEffect(() => {
    setDoodles(generateDoodles());

    if (phase === "loading") {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < maxTicks) return prev + 1;
          clearInterval(timer);
          setPhase("splash");
          return prev;
        });
      }, interval);
    }

    if (phase === "splash") {
      const splashDuration = 2000; // ms
      const timeout = setTimeout(() => {
        // ✅ Wait until robot is ready before going to main content
        if (robotLoaded) onComplete();
        else {
          // Poll until robot finishes loading
          const checkInterval = setInterval(() => {
            if (robotLoaded) {
              clearInterval(checkInterval);
              onComplete();
            }
          }, 300);
        }
      }, splashDuration);

      return () => clearTimeout(timeout);
    }
  }, [phase, onComplete, robotLoaded]);

  return (
    <motion.div
      key={phase}
      className="fixed inset-0 bg-black text-teal-400 font-mono flex flex-col items-center justify-center z-50 px-4 text-sm sm:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {phase === "loading" && (
        <>
          <motion.div
            className="text-lg sm:text-xl mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
          <motion.div
            className="text-lg sm:text-xl tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-gray-600">[</span>
            <span className="text-teal-400">{"#".repeat(progress)}</span>
            <span className="text-gray-600">
              {".".repeat(maxTicks - progress)}
            </span>
            <span className="text-gray-600">]</span>
          </motion.div>
        </>
      )}

      {phase === "splash" && <SplashScreen doodles={doodles} />}

      {/* 🔥 Hidden Preloader for Robot */}
      <div className="hidden">
        <Spline scene="./robot.splinecode" onLoad={() => setRobotLoaded(true)} />
      </div>
    </motion.div>
  );
};

export default Loader;
