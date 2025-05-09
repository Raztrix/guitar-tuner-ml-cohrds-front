import React from 'react';
import '../src/TunerNeedle.css';

const TunerNeedle = ({ frequency, targetFrequency }) => {
  if (!frequency || !targetFrequency) return null;

  const deviation = frequency - targetFrequency;
  const maxDeviation = 10; // Hz
  const angle = Math.max(-45, Math.min(45, (deviation / maxDeviation) * 45));

  let tuningHint = 'IN TUNE';
  if (deviation > 3) tuningHint = 'SHARP ↑';
  else if (deviation < -3) tuningHint = 'FLAT ↓';

  return (
    <div className="tuner-wrapper-80s">
      <div className="dial-80s">
        <div className="needle-80s" style={{ transform: `rotate(${angle}deg)` }} />
        <div className="center-dot-80s" />
      </div>
      <div className="hint-80s">{tuningHint}</div>
    </div>
  );
};

export default TunerNeedle;
