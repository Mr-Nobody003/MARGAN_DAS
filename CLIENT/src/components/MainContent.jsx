import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import Navbar from './Navbar';

const MainContent = () => {
  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
};

export default MainContent;
