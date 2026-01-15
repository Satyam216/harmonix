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
import { Play, Shuffle, Trash2, MoreHorizontal } from "lucide-react";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playTrack, playQueue } = useAudio();

  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔹 Load playlist meta */
  useEffect(() => {
    const loadPlaylist = async () => {
      const snap = await getDoc(doc(db, "playlists", id));
      if (snap.exists()) setPlaylist(snap.data());
    };
    loadPlaylist();
  }, [id]);

  /* 🔹 Load songs */
  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);

      const snap = await getDocs(collection(db, "playlists", id, "songs"));

      const tracks = await Promise.all(
        snap.docs.map(async (d) => {
          const trackId = d.data().trackId;
          const t = await getDoc(doc(db, "tracks", trackId));
          return {
            id: t.id,
            ...t.data(),
            addedAt: d.data().addedAt?.toDate(),
          };
        })
      );

      setSongs(tracks);
      setLoading(false);
    };

    loadSongs();
  }, [id]);

  const removeSong = async (trackId) => {
    await deleteDoc(doc(db, "playlists", id, "songs", trackId));
    setSongs((prev) => prev.filter((s) => s.id !== trackId));
  };

  const playAll = () => {
    if (songs.length) playQueue(songs);
  };

    /* 🎨 COLLAGE RENDER */
    const renderCollage = () => {
    const imgs = songs.slice(0, 4);

    // 1 IMAGE → FULL
    if (imgs.length === 1) {
        return (
        <img
            src={imgs[0].coverUrl}
            className="w-full h-full object-cover"
        />
        );
    }

    // 2 IMAGES → 2 COLUMNS
    if (imgs.length === 2) {
        return (
        <div className="grid grid-cols-2 h-full">
            {imgs.map((s) => (
            <img
                key={s.id}
                src={s.coverUrl}
                className="w-full h-full object-cover"
            />
            ))}
        </div>
        );
    }
    // ⭐ 3 IMAGES → 1 BIG + 2 STACKED (BEST LOOK)
    if (imgs.length === 3) {
        return (
        <div className="grid grid-cols-2 h-full">
            {/* BIG IMAGE */}
            <img
            src={imgs[0].coverUrl}
            className="w-full h-full object-cover"
            />

            {/* 2 SMALL IMAGES */}
            <div className="grid grid-rows-2 h-full">
            <img
                src={imgs[1].coverUrl}
                className="w-full h-full object-cover"
            />
            <img
                src={imgs[2].coverUrl}
                className="w-full h-full object-cover"
            />
            </div>
        </div>
        );
    }
    // 3 OR 4 IMAGES → 2x2 GRID
    return (
        <div className="grid grid-cols-2 grid-rows-2 h-full">
        {imgs.map((s) => (
            <img
            key={s.id}
            src={s.coverUrl}
            className="w-full h-full object-cover"
            />
        ))}
        </div>
    );
    };


  return (
    <div className="text-white min-h-screen bg-black">

      {/* 🔥 HEADER */}
      <div className="flex gap-6 px-8 py-10 bg-gradient-to-br from-orange-500 via-amber-500 to-black">

        <div className="w-56 h-56 bg-zinc-800 rounded overflow-hidden">
          {songs.length ? renderCollage() : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end pb-4">
          <p className="uppercase text-sm tracking-wide">Playlist</p>

          <h1 className="text-6xl font-extrabold leading-tight">
            {playlist?.name || "Playlist"}
          </h1>

          <p className="text-sm text-gray-200 mt-2">
            {songs.length} songs
          </p>

          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={playAll}
              className="bg-green-500 p-4 rounded-full hover:scale-105 transition"
            >
              <Play fill="black" />
            </button>

            <button
              onClick={() =>
                playQueue([...songs].sort(() => Math.random() - 0.5))
              }
              className="hover:text-white"
            >
              <Shuffle />
            </button>

            <MoreHorizontal className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 🎵 SONG TABLE */}
      <div className="px-8 mt-10">

        {/* HEADER */}
        <div className="grid grid-cols-[85px_1fr_210px_172px_40px]
                        text-gray-400 text-sm border-b border-white/10 pb-2">
          <span className="ml-2">#</span>
          <span>Title</span>
          <span>Artist</span>
          <span>Date added</span>
          <span></span>
        </div>

        {loading && <p className="text-gray-400 mt-4">Loading...</p>}

        {!loading && songs.length === 0 && (
          <p className="text-gray-400 mt-6">No songs in this playlist</p>
        )}

        {songs.map((s, i) => (
          <div
            key={s.id}
            className="grid grid-cols-[40px_1fr_220px_160px_40px]
                       items-center py-3 px-2
                       hover:bg-white/10 rounded transition"
          >
            <span className="text-gray-400">{i + 1}</span>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => playTrack(s)}
            >
              <img src={s.coverUrl} className="w-10 h-10 rounded" />
              <span className="font-medium">{s.title}</span>
            </div>

            <span className="text-gray-400">{s.artist}</span>

            <span className="text-gray-400 text-sm">
              {s.addedAt?.toLocaleDateString() || "--"}
            </span>

            <Trash2
              size={18}
              onClick={() => removeSong(s.id)}
              className="text-red-400 hover:text-red-500 cursor-pointer justify-self-end"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
