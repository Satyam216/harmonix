import { Play } from "lucide-react";
import { usePodcast } from "../context/PodcastContext";

export default function PodcastCard({ podcast }) {
  const { playPodcast } = usePodcast();

  return (
    <div
      onClick={() => playPodcast(podcast)}
      className="
        group cursor-pointer
        bg-zinc-900 hover:bg-zinc-800
        rounded-xl overflow-hidden
        transition
        w-full max-w-[280px]
      "
    >
      {/* 🎬 COVER (WIDE IMAGE) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={podcast.coverUrl}
          alt={podcast.title}
          className="w-full h-full object-cover"
        />

        {/* ▶ PLAY BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playPodcast(podcast);
          }}
          className="
            absolute bottom-3 right-3
            bg-red-500
            p-3 rounded-full
            shadow-xl
            opacity-0 group-hover:opacity-100
            scale-90 group-hover:scale-100
            transition
          "
        >
          <Play size={20} fill="black" />
        </button>
      </div>

      {/* 📝 TEXT */}
      <div className="p-3">
        <p className="font-semibold text-white leading-snug line-clamp-2">
          {podcast.title}
        </p>
        <p className="text-sm text-gray-400 mt-1 truncate">
          {podcast.host}
        </p>
      </div>
    </div>
  );
}
