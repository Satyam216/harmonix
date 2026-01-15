import { Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="
        bg-zinc-800 rounded-xl p-4 cursor-pointer
        hover:bg-zinc-700 transition
      "
    >
      <div
        className="
          h-36 rounded-lg
          bg-gradient-to-br from-green-500 to-emerald-700
          flex items-center justify-center
        "
      >
        <Music size={40} />
      </div>

      <h3 className="mt-3 font-semibold truncate">
        {playlist.name}
      </h3>

      <p className="text-xs text-gray-400">
        {playlist.songCount || 0} songs
      </p>
    </div>
  );
}
