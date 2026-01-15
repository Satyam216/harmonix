import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import PlaylistCover from "./PlaylistCover";
import { Trash2 } from "lucide-react";

export default function PlaylistCard({ playlist, onDelete }) {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [songCount, setSongCount] = useState(0);

  // 🔥 REAL-TIME SONG COUNT + COVERS
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "playlists", playlist.id, "songs"),
      async (snap) => {
        // ✅ correct count
        setSongCount(snap.size);

        // ✅ trackId = document id
        const trackIds = snap.docs.slice(0, 4).map((d) => d.id);

        const covers = await Promise.all(
          trackIds.map(async (id) => {
            const t = await getDoc(doc(db, "tracks", id));
            return t.exists() ? t.data().coverUrl : null;
          })
        );

        setImages(covers.filter(Boolean));
      }
    );

    return () => unsub();
  }, [playlist.id]);

  // 🗑️ DELETE PLAYLIST (WITH UI UPDATE)
  const deletePlaylist = async (e) => {
    e.stopPropagation();

    const snap = await onSnapshot(
      collection(db, "playlists", playlist.id, "songs"),
      () => {}
    );

    // delete all songs
    const songsSnap = await import("firebase/firestore").then(({ getDocs }) =>
      getDocs(collection(db, "playlists", playlist.id, "songs"))
    );

    await Promise.all(
      songsSnap.docs.map((d) =>
        deleteDoc(doc(db, "playlists", playlist.id, "songs", d.id))
      )
    );

    // delete playlist doc
    await deleteDoc(doc(db, "playlists", playlist.id));

    // 🔥 instant UI update
    onDelete(playlist.id);
  };

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="
        relative group cursor-pointer
        bg-zinc-900 hover:bg-zinc-800
        rounded-xl p-3 transition
      "
    >
      {/* 🗑️ DELETE ICON */}
      <button
        onClick={deletePlaylist}
        className="
          absolute bottom-3 right-3 z-10
          p-2 rounded-full
          bg-black/60 hover:bg-red-500
          text-gray-300 hover:text-white
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        <Trash2 size={14} />
      </button>

      {/* COVER */}
      <div className="aspect-square mb-3 rounded-lg overflow-hidden">
        <PlaylistCover images={images} />
      </div>

      {/* INFO */}
      <p className="text-sm font-semibold truncate">
        {playlist.name}
      </p>
      <p className="text-xs text-gray-400">
        {songCount} songs
      </p>
    </div>
  );
}
