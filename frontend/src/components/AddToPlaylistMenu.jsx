import { Plus, Music } from "lucide-react";
import { useState } from "react";
import { usePlaylists } from "../hooks/usePlaylists";
import { useAddSongToPlaylist } from "../hooks/addSongToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";

export default function AddToPlaylistMenu({ song }) {
  const playlists = usePlaylists();
  const { addSongToPlaylist } = useAddSongToPlaylist();

  const [open, setOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
      >
        <Plus size={16} />
      </button>

      {open && (
        <div
          className="
            absolute bottom-8 right-0 z-50 w-56
            bg-zinc-900 border border-white/10
            rounded-xl shadow-xl p-2
          "
          onClick={(e) => e.stopPropagation()}
        >
          {playlists.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                addSongToPlaylist(p.id, song);
                setOpen(false);
              }}
              className="
                flex items-center gap-2 w-full
                px-3 py-2 text-sm text-gray-200
                hover:bg-white/10 rounded-lg
              "
            >
              <Music size={14} />
              {p.name}
            </button>
          ))}

          <div className="border-t border-white/10 my-2" />

          <button
            onClick={() => {
              setShowCreate(true);
              setOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-green-400"
          >
            <Plus size={14} />
            Create new playlist
          </button>
        </div>
      )}

      {showCreate && (
        <CreatePlaylistModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}
