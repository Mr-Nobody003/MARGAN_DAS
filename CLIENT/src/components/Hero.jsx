import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  const fullText = "Hi, I'm Margan ";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [hasSnapped, setHasSnapped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Words to animate
  const words = ["Modern", "Scalable", "Secure"];
  const [wordIndex, setWordIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  // Cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500); // change word every 2.5s
    return () => clearInterval(interval);
  }, []);

  // Scroll snap logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY ? "down" : "up";
      lastScrollY = currentY;

      if (!hasSnapped) {
        if (direction === "down" && currentY > 10 && aboutRef.current) {
          aboutRef.current.scrollIntoView({ behavior: "smooth" });
          setHasSnapped(true);
        }
        if (
          direction === "up" &&
          currentY < window.innerHeight - 10 &&
          heroRef.current
        ) {
          heroRef.current.scrollIntoView({ behavior: "smooth" });
          setHasSnapped(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSnapped]);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative snap-start min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 bg-gradient-to-b from-[#0f0f0f] via-[#0d1b1e] to-black overflow-hidden"
      >
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900 via-black to-red-900 opacity-40 " />

        {/* Text content */}
        <div className="relative z-10 text-center md:text-left max-w-xl md:mt-6 mt-0 md:ml-[20%]">
          <h1 className="text-4xl sm:text-6xl font-bold font-family-mozilla-headline text-teal-400">
            {displayedText}
            <span className="animate-pulse text-red-400">|</span>
          </h1>
          <h2 className="mt-4 font-family-mozilla-headline text-lg sm:text-3xl text-teal-300">
            Full Stack Developer building{" "}
          </h2>
          <span className="text-4xl sm:text-6xl font-family-mozilla-headline  text-red-400 ">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          <h2 className=" text-lg font-family-mozilla-headline sm:text-3xl text-teal-300">
            web solutions.{" "}
          </h2>
        </div>

        {/* Robot */}
        <div className="w-full md:w-1/2 h-[500px] md:h-[500px] relative z-10 flex justify-center items-center md:-mr-[5%]">
          {!isLoaded && (
            <div className="text-teal-400 justify-center items-center animate-pulse">
              Loading Robot...
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1.5 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full flex justify-center items-center"
          >
            <Spline
              scene="./robot.splinecode"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        </div>
        {/* scroll icon */}
        {/* <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
          <motion.div
            className="absolute bottom-6 text-teal-400 text-sm flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span>Scroll Down</span>

            
            <div className="w-1 h-4 bg-teal-400 rounded-full -mb-2" />

            <div className="relative flex justify-center m-0">
              <div className="w-4 h-4 border-b-3 border-r-3 border-teal-400 rotate-45"></div>
            </div>
          </motion.div>
        </div> 
        */}
      </section>

      <div ref={aboutRef} />
    </>
  );
};

export default Hero;
