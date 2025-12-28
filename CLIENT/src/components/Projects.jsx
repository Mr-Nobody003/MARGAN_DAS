import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Game UI",
      desc: "GUI replica of the game Valorant with Tailwind-made custom icons, Single-page rendering for speed and also published as a progressive web app.",
    },
    {
      title: "Elective Selector GUI",
      desc: "Desktop app for slotting students electives based on capacity of the subject and in fcfs manner.",
    },
    {
      title: "Northeast Handicrafts Store",
      desc: "E-commerce site promoting traditional arts with artisan profiles, built with MERN stack.",
    },
    {
      title: "CHAT-APP",
      desc: "Developed a Real-time web-chat Application for organizational use, Operates locally with LAN connectivity and local DB. ",
    },
    {
      title:"Bézier-Curve",
      desc:"Interactive Bézier Curve with Physics & Sensor Control An interactive cubic Bézier curve that behaves like a physical rope instead of a static vector path Control points respond with spring dynamics, damping, and inertia, producing smooth, organic motion"
    },
    {
      title:"Optical Character Recognition Model",
      desc:"Developed an OCR model using Machine Learning (Neural Network) for the Chakma script.Engineered an end-to-end training pipeline using Python, Tesseract and OpenCV to iteratively fine-tune the model, achieving final accuracy of 90.3%. "
    }

  ];

  const [typedTitles, setTypedTitles] = useState(
    Array(projects.length).fill("")
  );
  const [typedDescs, setTypedDescs] = useState(Array(projects.length).fill(""));

  useEffect(() => {
    if (isInView) {
      projects.forEach((proj, i) => {
        let titleIndex = 0;
        let descIndex = 0;

        const titleInterval = setInterval(() => {
          setTypedTitles((prev) => {
            const updated = [...prev];
            updated[i] = proj.title.slice(0, titleIndex + 1);
            return updated;
          });
          titleIndex++;
          if (titleIndex === proj.title.length) clearInterval(titleInterval);
        }, 40);

        const descDelay = proj.title.length * 40 + 300;

        setTimeout(() => {
          const descInterval = setInterval(() => {
            setTypedDescs((prev) => {
              const updated = [...prev];
              updated[i] = proj.desc.slice(0, descIndex + 1);
              return updated;
            });
            descIndex++;
            if (descIndex === proj.desc.length) clearInterval(descInterval);
          }, 15);
        }, descDelay);
      });
    }
  }, [isInView]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="snap-start min-h-screen py-24 px-4 sm:px-8 bg-black text-teal-400 font-mono text-center flex flex-col items-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 border-b border-teal-400 pb-2 inline-block">
        Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {projects.map((_, index) => (
          <div
            key={index}
            className="bg-[#0f0f0f] border border-teal-700 rounded-lg p-6 text-left shadow-md hover:shadow-teal-400/30 transition-all hover:border-teal-400"
          >
            <h3 className="text-xl font-bold mb-2 tracking-wide">
              {typedTitles[index]}
              {isInView &&
                typedTitles[index].length < projects[index].title.length && (
                  <span className="animate-pulse">|</span>
                )}
            </h3>
            <p className="text-teal-200 whitespace-pre-wrap">
              {typedDescs[index]}
              {isInView &&
                typedDescs[index].length < projects[index].desc.length && (
                  <span className="animate-pulse text-teal-500">|</span>
                )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
