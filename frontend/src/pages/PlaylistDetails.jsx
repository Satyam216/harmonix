import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAudio } from "../context/AudioContext";
import { Trash2 } from "lucide-react";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playTrack } = useAudio();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);

      // 1️⃣ playlist -> song refs
      const snap = await getDocs(
        collection(db, "playlists", id, "songs")
      );

      const trackIds = snap.docs.map(
        (d) => d.data().trackId
      );

      // 2️⃣ tracks collection se full data
      const tracks = await Promise.all(
        trackIds.map(async (trackId) => {
          const t = await getDoc(doc(db, "tracks", trackId));
          if (!t.exists()) return null;
          return { id: t.id, ...t.data() };
        })
      );

      setSongs(tracks.filter(Boolean));
      setLoading(false);
    };

    loadSongs();
  }, [id]);

  // 🗑 remove song
  const removeSong = async (trackId) => {
    await deleteDoc(
      doc(db, "playlists", id, "songs", trackId)
    );

    setSongs((prev) =>
      prev.filter((s) => s.id !== trackId)
    );
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Playlist</h1>

      {loading && (
        <p className="text-gray-400">Loading...</p>
      )}

      {!loading && songs.length === 0 && (
        <p className="text-gray-400">
          No songs in this playlist
        </p>
      )}

      {/* 🧾 TABLE HEADER */}
      {songs.length > 0 && (
        <div className="grid grid-cols-[50px_1fr_200px_60px] px-4 py-2 text-sm text-gray-400 border-b border-white/10">
          <span>#</span>
          <span>Title</span>
          <span>Artist</span>
          <span></span>
        </div>
      )}

      {/* 🎵 SONG ROWS */}
      <div className="flex flex-col">
        {songs.map((s, i) => (
          <div
            key={s.id}
            onClick={() => playTrack(s)}
            className="
              grid grid-cols-[50px_1fr_200px_60px]
              items-center
              px-4 py-3
              hover:bg-white/5
              cursor-pointer
              group
            "
          >
            {/* INDEX */}
            <span className="text-gray-400">
              {i + 1}
            </span>

            {/* TITLE */}
            <div className="flex items-center gap-4">
              <img
                src={s.coverUrl}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium truncate">
                  {s.title}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {s.artist}
                </p>
              </div>
            </div>

            {/* ARTIST */}
            <span className="text-gray-400 truncate">
              {s.artist}
            </span>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSong(s.id);
              }}
              className="
                opacity-0 group-hover:opacity-100
                text-gray-400 hover:text-red-500
                transition
              "
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
