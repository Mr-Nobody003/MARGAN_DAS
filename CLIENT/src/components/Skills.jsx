import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // const skills = ["React", "Tailwind", "Node.js", "C++", "MongoDB", "MySQL"];
  const skills = [
    "C++",
    "C",
    "Python",
    "Shell Scripting",
    "HTML",
    "CSS",
    "JavaScript",
    "MySQL",
    "MongoDB",
    "React.Js",
    "Tailwind CSS",
    "Express.js",
    "Socket.io",
    "wxWidgets",
    "OpenCV",
    "Docker",
    "GIT",
    "Postman",
    "ThunderClient",
    "Tesseract-OCR",
  ];
  const [typedSkills, setTypedSkills] = useState(Array(skills.length).fill(""));

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
      className="relative snap-start min-h-screen py-24 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center flex flex-col justify-center items-center"
    >
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900 via-black to-red-900 opacity-40" />
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.08] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100%_3px]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.15)_0%,transparent_70%)]" />
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 border-b border-teal-400 pb-2">
          Skills
        </h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {typedSkills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm sm:text-base bg-[#0f0f0f] text-teal-300 border border-teal-600 rounded-full shadow hover:shadow-teal-400/40 transition hover:-translate-y-2 hover:border-teal-200"
            >
              {skill}
              {isInView && skill.length < skills[index].length && (
                <span className="animate-pulse text-teal-500 hover:text-teal-200">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
