"use client";

import { useState, useRef, useEffect } from "react";

export function CustomAudioPlayer({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    // Initial setting if already loaded
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (amount: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + amount));
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="custom-audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top Info */}
      <div className="audio-header">
        <div className="audio-icon">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <div>
          <h4 className="audio-title">{title || "Escuchar resumen"}</h4>
          <p className="audio-time-label">Resumen de Audio</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="audio-progress-container">
        <span className="audio-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="audio-slider"
          style={{
            backgroundSize: `${duration > 0 ? (currentTime / duration) * 100 : 0}% 100%`,
            flex: 1
          }}
        />
        <span className="audio-time">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        <button onClick={() => skipTime(-15)} className="audio-btn-secondary" title="Rebobinar 15s">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 9 5 5 9 9"></polyline>
            <path d="M5 5V12C5 17 9 21 14 21C16.5 21 18.8 20 20.3 18.3"></path>
            <text x="12" y="14" fontSize="6" fontWeight="bold">15</text>
          </svg>
        </button>

        <button onClick={togglePlayPause} className="audio-btn-primary" aria-label={isPlaying ? "Pausar" : "Reproducir"}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M6 5a1 1 0 011 1v12a1 1 0 11-2 0V6a1 1 0 011-1zm12 0a1 1 0 011 1v12a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <button onClick={() => skipTime(15)} className="audio-btn-secondary" title="Avanzar 15s">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 9 19 5 15 9"></polyline>
            <path d="M19 5V12C19 17 15 21 10 21C7.5 21 5.2 20 3.7 18.3"></path>
            <text x="7" y="14" fontSize="6" fontWeight="bold">15</text>
          </svg>
        </button>
      </div>
    </div>
  );
}
