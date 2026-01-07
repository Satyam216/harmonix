import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useAudio } from "../context/AudioContext";
import {
  Play,
  Heart,
  Download,
  Search,
  ArrowDownUp,
} from "lucide-react";

export default function LikedSongs() {
  const { user } = useAuth();
  const { playTrack } = useAudio();

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  // 🔹 fetch liked songs
  useEffect(() => {
    if (!user) return;

    const fetchLiked = async () => {
      const q = query(
        collection(db, "likedSongs", user.uid, "songs"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setSongs(data);
      setLoading(false);
    };

    fetchLiked();
  }, [user]);

  // 🔹 sorting + searching
  const filteredSongs = useMemo(() => {
    let list = [...songs];

    if (search) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.artist.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "artist") {
      list.sort((a, b) => a.artist.localeCompare(b.artist));
    }
    if (sortBy === "date") {
      list.sort(
        (a, b) =>
          b.createdAt?.seconds - a.createdAt?.seconds
      );
    }

    return list;
  }, [songs, search, sortBy]);

  const playAll = () => {
    if (filteredSongs.length) {
      playTrack(filteredSongs[0]);
    }
  };

  const unlikeSong = async (songId) => {
    await deleteDoc(doc(db, "likedSongs", user.uid, "songs", songId));
    setSongs((prev) => prev.filter((s) => s.id !== songId));
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white min-h-screen">

      {/* 🔮 HEADER */}
      <div className="flex gap-6 items-end px-8 py-10 bg-gradient-to-br from-rose-400 via-purple-600 to-indigo-500">
        <div className="w-44 h-44 bg-gradient-to-br from-green-400 to-indigo-500 rounded-lg flex items-center justify-center">
          <Heart size={72} fill="white" />
        </div>

        <div>
          <p className="uppercase text-sm text-gray-300">Playlist</p>
          <h1 className="text-6xl font-extrabold">Liked Songs</h1>
          <p className="text-gray-300 mt-2">
            {user?.displayName || "You"} • {songs.length} songs
          </p>
        </div>
      </div>

      {/* 🔘 CONTROLS */}
      <div className="flex items-center justify-between px-8 py-6 bg-black/60">
        <div className="flex items-center gap-4">
          <button
            onClick={playAll}
            className="bg-green-500 text-black p-4 rounded-full hover:scale-105 transition"
          >
            <Play fill="black" />
          </button>

          <button className="text-gray-300 hover:text-white">
            <ArrowDownUp />
          </button>
        </div>

        {/* 🔍 SEARCH + SORT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-800 px-3 py-2 rounded">
            <Search size={16} />
            <input
              placeholder="Search in liked songs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 text-sm"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-800 text-sm px-3 py-2 rounded"
          >
            <option value="date">Date added</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>
        </div>
      </div>

      {/* 📃 LIST */}
      <div className="px-8">
        <table className="w-full text-sm mt-4">
          <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="py-3 px-2 text-left w-10">#</th>

                {/* TITLE COLUMN */}
                <th className="py-3 px-2 text-left">
                  Title
                </th>

                {/* ARTIST */}
                <th className="py-3 px-2 text-left">
                  Artist
                </th>

                {/* DATE */}
                <th className="py-3 px-2 text-left">
                  Date added
                </th>

                <th className="py-3 px-2"></th>
              </tr>
            </thead>


          <tbody>
            {filteredSongs.map((song, i) => (
            <tr
              onClick={() => playTrack(song)}
              className="group hover:bg-white/10 transition cursor-pointer"
            >
              <td className="py-3 px-2 text-gray-400">{i + 1}</td>

              <td className="py-3 px-2">
                <div className="flex items-center gap-4">
                  <img
                    src={song.coverUrl}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                </div>
              </td>

              <td className="py-3 px-2 text-gray-400">
                {song.artist}
              </td>

              <td className="py-3 px-2 text-gray-400">
                {song.createdAt
                  ? new Date(song.createdAt.seconds * 1000).toDateString()
                  : "-"}
              </td>

              <td className="py-3 px-2 text-right opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unlikeSong(song.id);
                  }}
                  className="text-red-400 hover:text-red-500"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </td>
            </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
