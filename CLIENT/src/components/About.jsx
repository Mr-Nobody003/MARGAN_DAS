import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [typedText, setTypedText] = useState('');
  const fullText = ` I'm a developer skilled in React, C++, MongoDB, and more. I love solving real-world problems and bringing ideas to life.`;

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + fullText[current]);
        current++;
        if (current === fullText.length) clearInterval(interval);
      }, 20); // typing speed
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="about"
      className="snap-start py-26 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center min-h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-teal-400 pb-2">
        About Me
      </h2>

      <p className="text-base sm:text-lg max-w-2xl mx-auto text-left whitespace-pre-wrap">
        {typedText}
        {isInView && typedText.length < fullText.length && (
          <span className="animate-pulse text-teal-500">|</span>
        )}
      </p>
    </section>
  );
};

export default About;
