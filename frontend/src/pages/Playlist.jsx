import { Plus } from "lucide-react";
import { usePlaylists } from "../hooks/usePlaylists";
import { useState } from "react";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import PlaylistCard from "../components/PlaylistCard";

export default function Playlists() {
  const playlists = usePlaylists();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Playlists</h1>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded"
        >
          <Plus size={18} /> New Playlist
        </button>
      </div>

      {playlists.length === 0 && (
        <p className="text-gray-400">No playlists created yet</p>
      )}

      {/* 🔥 THIS WAS MISSING */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {open && <CreatePlaylistModal onClose={() => setOpen(false)} />}
    </div>
  );
}
