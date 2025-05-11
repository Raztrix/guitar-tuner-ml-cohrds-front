import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(onNoteDetected) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // adjust if needed
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket.IO connected');
    });

    socket.on('note_detected', (data) => {
      onNoteDetected(data);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket.IO disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [onNoteDetected]);

  return socketRef;
}
