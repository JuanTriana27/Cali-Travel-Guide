import React, { useState, useRef } from 'react';
import '../AudioPlayer/audioPlayer.css';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audioPlayer">
      <button onClick={togglePlay} className="playButton">
        {isPlaying ? '⏸' : '▶'}
      </button>
      <audio ref={audioRef} src={audioSrc} />
      <div className="audioTitle">Audioguía Historia de Cristo Rey</div>
    </div>
  );
};

export default AudioPlayer;