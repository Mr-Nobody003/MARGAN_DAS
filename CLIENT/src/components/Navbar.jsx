import { motion } from 'framer-motion';
import { useState } from 'react';

const links = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-md shadow-md border-b border-teal-600 hover:border-red-400 transition-colors"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between ">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-gloss" />
        {/* Logo with Gloss Effect */}
        <a
          href="#hero"
          className="relative inline-block text-teal-400 font-bold text-xl tracking-wide overflow-hidden"
        >
          <span className="relative z-10">MARGAN </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-teal-300 font-medium">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="hover:bg-red-400 hover:border-red-400 hover:text-white transition-colors border border-teal-300 rounded-xl pl-2 pr-2"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-teal-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-teal-600 flex flex-col items-center py-3">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2 text-teal-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
