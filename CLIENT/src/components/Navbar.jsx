// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-blue-100 to-white backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Margan</div>
        <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
          <a href="#hero" className="hover:text-blue-500">Home</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#skills" className="hover:text-blue-500">Skills</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </nav>
        <div>
          {/* Theme switcher placeholder */}
          <button
            className="border rounded-full px-3 py-1 text-sm font-medium hover:bg-gray-100 transition"
            title="Toggle Theme"
          >
            🌓 Theme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
