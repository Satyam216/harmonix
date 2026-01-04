import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playTrack = (track) => {
    if (!track) return;
    if (current?.audioUrl !== track.audioUrl) {
      audioRef.current.src = track.audioUrl;
      setCurrent(track);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (value) => {
    audioRef.current.currentTime = value;
  };

  audioRef.current.ontimeupdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  return (
    <AudioContext.Provider
      value={{
        current,
        isPlaying,
        playTrack,
        pauseTrack,
        progress,
        seek,
        duration: audioRef.current.duration || 0,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
