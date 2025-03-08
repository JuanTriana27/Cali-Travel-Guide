import React, { useState, useRef, useEffect } from 'react';
import './audioPlayer.css';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(progress);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const setAudioData = () => {
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
    };
  }, []);

  return (
    <div className="audioPlayer">
      <button onClick={togglePlay} className="playButton">
        <div className="buttonContent">
          {isPlaying ? (
            <svg className="pauseIcon" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="playIcon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </button>

      <div className="progressContainer">
        <div className="timeDisplay">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
        <div className="progressBar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default AudioPlayer;