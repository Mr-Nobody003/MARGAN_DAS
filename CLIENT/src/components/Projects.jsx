const Projects = () => {
  const projects = [
    { title: 'Project 1', desc: 'Description of your awesome project' },
    { title: 'Project 2', desc: 'Another cool thing you built' },
    { title: 'Project 3', desc: 'One more project here' },
  ];

  return (
    <section id="projects" className="py-16 px-4 sm:px-8 bg-gray-50 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
            <p className="text-gray-600">{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
