import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const fullText = "Hi, I'm Margan";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const [hasSnapped, setHasSnapped] = useState(false);

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
          setHasSnapped(true); // Only auto-scroll once
        }

        if (
          direction === "up" &&
          currentY < window.innerHeight - 10 &&
          heroRef.current
        ) {
          heroRef.current.scrollIntoView({ behavior: "smooth" });
          setHasSnapped(true); // Mark snapped so it doesn’t interfere later
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
        className=" snap-start min-h-screen flex flex-col justify-center items-center bg-black text-teal-400 text-center px-6"
      >
        <h1 className="text-4xl sm:text-6xl font-bold font-mono">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="mt-4 text-lg sm:text-2xl max-w-xl text-teal-300">
          Full Stack Developer building modern web solutions.
        </p>
      </section>

      {/* Invisible marker to scroll to next section */}
      <div ref={aboutRef} />
    </>
  );
};

export default Hero;
