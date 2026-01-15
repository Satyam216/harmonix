import PlaylistCard from "../components/PlaylistCard";
import { Plus } from "lucide-react";
import { usePlaylists } from "../hooks/usePlaylists";
import { useState } from "react";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

export default function Playlists() {
  const playlists = usePlaylists();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded-full"
        >
          <Plus size={18} /> Creat New
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {playlists.map((p) => (
          <PlaylistCard key={p.id} playlist={p} />
        ))}
      </div>

      {open && <CreatePlaylistModal onClose={() => setOpen(false)} />}
    </div>
  );
}
