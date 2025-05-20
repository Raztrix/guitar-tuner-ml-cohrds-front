import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (onNoteDetected) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'], // Force WebSocket only if you want to skip polling
    });

    socket.on('connect', () => {
      console.log('🔌 Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    socket.on('note_detected', (data) => {
      console.log('🎵 Note detected:', data);
      if (onNoteDetected) onNoteDetected(data);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [onNoteDetected]);

  return socketRef;
};

export default useSocket;
