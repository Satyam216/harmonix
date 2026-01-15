import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function CreatePlaylistModal({ onClose }) {
  const [name, setName] = useState("");
  const { user } = useAuth();

  const createPlaylist = async () => {
    if (!name.trim()) return;

    await addDoc(collection(db, "playlists"), {
      name,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Create Playlist</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="w-full p-3 rounded bg-zinc-800 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-400">Cancel</button>
          <button
            onClick={createPlaylist}
            className="bg-grey-500 px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
