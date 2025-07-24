import React, { useState } from 'react';
import Loader from './components/Loader';
import MainContent from './components/MainContent';

const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <div className="min-h-screen">
      {!showMain ? (
        <Loader onComplete={() => setShowMain(true)} />
      ) : (
        <MainContent />
      )}
    </div>
  );
};

export default App;
