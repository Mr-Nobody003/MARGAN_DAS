import { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  const fullText = "Hi, I'm Margan";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [hasSnapped, setHasSnapped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        className="relative snap-start min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 bg-gradient-to-b from-[#0f0f0f] via-[#0d1b1e] to-black overflow-hidden"
      >
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Text content (appears first on desktop, below robot on mobile) */}
        <div className="relative z-10 text-center md:text-left max-w-xl mt-6 md:mt-0">
          <h1 className="text-4xl sm:text-6xl font-bold font-mono text-teal-400">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-teal-300">
            Full Stack Developer building modern web solutions.
          </p>
        </div>

        {/* Robot (moves to right side on large screens) */}
        <div className="w-full md:w-1/2 h-[500px] md:h-[500px] relative z-10 flex justify-center items-center">
          {!isLoaded && (
            <div className="text-teal-400 animate-pulse">Loading Robot...</div>
          )}
          <Spline scene="./robot.splinecode" onLoad={() => setIsLoaded(true)} />
        </div>
      </section>

      {/* Invisible marker to scroll to next section */}
      <div ref={aboutRef} />
    </>
  );
};

export default Hero;
