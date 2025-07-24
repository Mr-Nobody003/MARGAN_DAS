import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const asciiM = [
  '███╗   ███╗',
  '████╗ ████║',
  '██╔████╔██║',
  '██║╚██╔╝██║',
  '██║ ╚═╝ ██║',
  '╚═╝     ╚═╝',
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  const maxTicks = 24;
  const interval = 100;

  useEffect(() => {
    if (phase === 'loading') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < maxTicks) return prev + 1;
          clearInterval(timer);
          setPhase('splash');
          return prev;
        });
      }, interval);
    }

    if (phase === 'splash') {
      const timeout = setTimeout(() => {
        onComplete(); // ✅ Inform parent to switch to MainContent
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      key={phase}
      className="fixed inset-0 bg-black text-teal-400 font-mono flex flex-col items-center justify-center z-50 px-4 text-sm sm:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {phase === 'loading' && (
        <>
          <motion.div
            className="text-lg sm:text-xl mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
          <motion.div
            className="text-lg sm:text-xl tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-gray-600">[</span>
            <span className="text-teal-400">{'#'.repeat(progress)}</span>
            <span className="text-gray-600">{'.'.repeat(maxTicks - progress)}</span>
            <span className="text-gray-600">]</span>
          </motion.div>
        </>
      )}

      {phase === 'splash' && (
        <motion.pre
          className="leading-tight text-center text-teal-300 text-lg sm:text-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {asciiM.join('\n')}
        </motion.pre>
      )}
    </motion.div>
  );
};

export default Loader;
