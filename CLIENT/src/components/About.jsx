import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [typedText, setTypedText] = useState('');
  const fullText = " I'm a developer skilled in React, C++, MongoDB, and more. I love solving real-world problems and bringing ideas to life. ";

  useEffect(() => {
  if (isInView) {
    let current = 0;
    const interval = setInterval(() => {
      if (current < fullText.length-1) {
        setTypedText((prev) => prev + fullText[current]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 20); // typing speed
    return () => clearInterval(interval);
  }
}, [isInView]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative snap-start py-26 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900 via-black to-red-900 opacity-40" />

      {/* Foreground content */}
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-teal-400 pb-2">
          About Me
        </h2>

        <p className="text-base sm:text-lg max-w-2xl mx-auto text-left whitespace-pre-wrap">
          {typedText}
          {isInView && typedText.length < fullText.length && (
            <span className="animate-pulse text-teal-500">|</span>
          )}
        </p>
      </div>
    </section>
  );
};

export default About;
