
import React from 'react';
import Sidebar from './components/Sidebar';
import CanvasArea from './components/CanvasArea';
import AnimatedCanvasArea from './components/AnimatedCanvasArea';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <Sidebar />
    <CanvasArea />
  </div>
  );
};

export default App;