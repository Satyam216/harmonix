import { Play, Pause } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function BottomPlayer() {
  const { current, isPlaying, playTrack, pauseTrack, progress, seek, duration } = useAudio();

  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex items-center gap-4 text-white">
      <img src={current.coverUrl} className="w-12 h-12 rounded" />

      <div className="flex-1">
        <p className="font-semibold">{current.title}</p>
        <p className="text-xs text-gray-400">{current.artist}</p>

        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={(e) => seek(e.target.value)}
          className="w-full"
        />
      </div>

      <button
        onClick={() => (isPlaying ? pauseTrack() : playTrack(current))}
        className="bg-green-500 p-3 rounded-full"
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  );
}
