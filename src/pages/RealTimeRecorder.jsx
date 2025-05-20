import React, { useState, useRef } from 'react';
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
} from '@mui/material';
import useSocket from '../useSocket';

export default function RealTimeRecorder() {
  const [recording, setRecording] = useState(false);
  const [note, setNote] = useState('');
  const [noteHistory, setNoteHistory] = useState([]);
  const mediaRecorderRef = useRef(null);

  const socketRef = useSocket((data) => {
    console.log(data);

    if (data.note === "No note detected") return;

    const formatted = `${data.note} (${data.frequency} Hz)`;
    setNote(formatted);
    setNoteHistory((prev) => [...prev.slice(-19), formatted]);

  });

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socketRef.current?.connected) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const arrayBuffer = reader.result;
          const uint8 = new Uint8Array(arrayBuffer);
          socketRef.current.emit('audio_chunk', uint8);
        };
        reader.readAsArrayBuffer(event.data);

      }
    };

    mediaRecorder.start(2000);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <Box
      sx={{
        fontFamily: "'Press Start 2P', monospace",
        minHeight: '100vh',
        bgcolor: '#0f0f0f',
        color: '#39ff14',
        p: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 3,
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        }}
      >
        🎸 80's Guitar Tuner
      </Typography>

      <Button
        onClick={recording ? stopRecording : startRecording}
        variant="outlined"
        sx={{
          color: recording ? '#ff4d6d' : '#39ff14',
          borderColor: recording ? '#ff4d6d' : '#39ff14',
          fontSize: { xs: '0.6rem', sm: '0.8rem' },
          mb: 3,
        }}
      >
        {recording ? '🛑 STOP' : '🎙️ RECORD'}
      </Button>

      <Typography
        variant="h6"
        className="blink"
        sx={{
          fontSize: { xs: '0.8rem', sm: '1rem' },
          mb: 2,
        }}
      >
        Current Note: <span style={{ color: '#fffb00' }}>{note || '--'}</span>
      </Typography>


      <Paper
        elevation={0}
        sx={{
          bgcolor: '#1a1a1a',
          color: '#39ff14',
          width: '100%',
          maxWidth: '400px',
          maxHeight: '200px',
          overflowY: 'auto',
          p: 2,
          border: '1px solid #39ff14',
          fontSize: '0.7rem',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          🎵 Note History
        </Typography>
        <List dense>
          {noteHistory.map((n, i) => (
            <ListItem key={i} disablePadding>
              <ListItemText primary={n} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
