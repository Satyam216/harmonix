import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PlaylistCard from "../components/PlaylistCard";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadPlaylists = async () => {
      const snap = await getDocs(collection(db, "playlists"));
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      }));
      setPlaylists(data);
    };

    loadPlaylists();
  }, []);

  // 🔥 UI se turant remove
  const handleDelete = (id) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Playlists</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-yellow-700 px-3 py-2 rounded"
        >
          <Plus /> Creat New
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
        {playlists.map(p => (
          <PlaylistCard
            key={p.id}
            playlist={p}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {open && <CreatePlaylistModal onClose={() => setOpen(false)} />}
    </div>
  );
}
