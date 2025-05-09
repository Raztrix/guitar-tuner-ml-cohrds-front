import React from 'react';
import '../src/TunerNeedle.css'; // Make sure this is imported globally
import AudioRecorder from './pages/AudioRecorder';

function App() {
  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      color: '#39ff14',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2vw',
      boxSizing: 'border-box'
    }}>
      <AudioRecorder />
    </div>
  );
}

export default App;
