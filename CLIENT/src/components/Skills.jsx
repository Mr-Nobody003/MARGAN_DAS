const Skills = () => {
  const skills = ["React", "Tailwind", "Node.js", "C++", "MongoDB", "MySQL"];

  return (
    <section id="skills" className="py-16 px-4 sm:px-8 bg-white text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 text-sm sm:text-base bg-blue-100 text-blue-800 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
