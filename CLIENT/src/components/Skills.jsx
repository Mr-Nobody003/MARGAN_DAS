import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // const skills = ["React", "Tailwind", "Node.js", "C++", "MongoDB", "MySQL"];
  const skills = ["ya really need to know my skills?"];
  const [typedSkills, setTypedSkills] = useState(Array(skills.length).fill(''));

  useEffect(() => {
    if (isInView) {
      skills.forEach((skill, i) => {
        let charIndex = 0;
        const delay = i * 200;

        setTimeout(() => {
          const interval = setInterval(() => {
            setTypedSkills((prev) => {
              const updated = [...prev];
              updated[i] = skill.slice(0, charIndex + 1);
              return updated;
            });
            charIndex++;
            if (charIndex === skill.length) clearInterval(interval);
          }, 50);
        }, delay);
      });
    }
  }, [isInView]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="snap-start min-h-screen py-24 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 border-b border-teal-400 pb-2">
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {typedSkills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 text-sm sm:text-base bg-[#0f0f0f] text-teal-300 border border-teal-600 rounded-full shadow hover:shadow-teal-400/40 transition"
          >
            {skill}
            {isInView && skill.length < skills[index].length && (
              <span className="animate-pulse text-teal-500">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
