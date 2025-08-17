import React, { useState } from "react";
import Loader from "./components/Loader";
import MainContent from "./components/MainContent";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <div className="min-h-screen bg-black ">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!showMain ? (
          <Loader key="loader" onComplete={() => setShowMain(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
