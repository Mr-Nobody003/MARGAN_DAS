const Footer = () => {
  return (
    <footer className="snap-start py-6 px-4 bg-black text-center text-sm sm:text-base text-teal-600 font-mono border-t border-teal-800">
      © {new Date().getFullYear()} <span className="text-teal-400">Margan Das</span>. All rights reserved.
    </footer>
  );
};

export default Footer;
