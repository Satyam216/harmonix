import { Play, Pause } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function BottomPlayer({ sidebarOpen }) {
  const {
    current,
    isPlaying,
    playTrack,
    pauseTrack,
    progress,
    seek,
    duration,
  } = useAudio();

  if (!current) return null;

  const formatTime = (time = 0) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div
      className={`
        fixed bottom-0 right-0 z-30
        h-24 bg-zinc-900 border-t border-white/10
        flex items-center px-6 gap-6
        transition-all duration-300
        ${sidebarOpen ? "left-64" : "left-0"}
      `}
    >
      {/* LEFT – SONG INFO */}
      <div className="flex items-center gap-4 w-1/4 min-w-[240px]">
        <img
          src={current.coverUrl}
          alt="cover"
          className="w-14 h-14 rounded-md object-cover"
        />
        <div>
          <p className="font-semibold leading-tight">{current.title}</p>
          <p className="text-sm text-gray-400">{current.artist}</p>
        </div>
      </div>

      {/* CENTER – CONTROLS + SEEK */}
      <div className="flex-1 flex flex-col items-center">
        <button
          onClick={() =>
            isPlaying ? pauseTrack() : playTrack(current)
          }
          className="bg-green-500 text-black p-3 rounded-full mb-2"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <div className="w-full flex items-center gap-3 text-xs text-gray-400">
          <span>{formatTime(progress)}</span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress || 0}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1 accent-green-500 cursor-pointer"
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT – EMPTY (future controls space) */}
      <div className="w-1/4 min-w-[200px]" />
    </div>
  );
}
