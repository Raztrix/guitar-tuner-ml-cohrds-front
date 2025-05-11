import React, { useEffect } from 'react';
import '../src/TunerNeedle.css'; // Make sure this is imported globally
import RealTimeRecorder from './pages/RealTimeRecorder';
import { io } from 'socket.io-client';

// 🔧 Test Socket.IO connection
function PingTest() {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('🔌 Connected, sending ping...');
      socket.emit('ping', { message: 'Hello from frontend' });
    });

    socket.on('pong', (data) => {
      console.log('🎯 Received from server:', data.message);
    });

    return () => socket.disconnect();
  }, []);

  return null;
}

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
      <RealTimeRecorder />
      <PingTest />
    </div>
  );
}

export default App;
