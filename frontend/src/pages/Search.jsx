import { useEffect, useState } from "react";
import axios from "axios";
import { Search as SearchIcon, X } from "lucide-react";
import { useAudio } from "../context/AudioContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(false);

  const { playTrack } = useAudio();

  // 🔹 Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_BASE}/api/search?q=${encodeURIComponent(query)}`
        );

        setResults(res.data?.tracks || []); // ✅ safe
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
  <div className="relative min-h-screen text-white overflow-hidden">

    {/* 🌈 Animated Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animate-gradient" />

    {/* ✨ Floating Blobs */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-floatSlow" />
    <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-floatFast" />

    {/* CONTENT */}
    <div className="relative z-10 p-6">

      {/* 🔍 SEARCH BAR */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative group">

          <SearchIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
            size={20}
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, podcasts..."
            className="
              w-full pl-14 pr-12 py-4 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-green-400
              transition-all duration-300
              group-hover:bg-white/15
            "
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 🔄 STATUS */}
      {loading && (
        <p className="text-center text-gray-300 animate-pulse">
          Searching magic ✨
        </p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-center text-gray-300">
          No results found 😔
        </p>
      )}

      {/* 🎵 RESULTS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
        {results.map((song) => (
          <div
            key={song.id}
            onClick={() => playTrack(song)}
            className="
              group cursor-pointer
              bg-white/10 backdrop-blur-xl
              border border-white/10
              rounded-xl p-4
              hover:scale-[1.05] hover:bg-white/20
              transition-all duration-300
              shadow-lg hover:shadow-2xl
            "
          >
            <div className="relative overflow-hidden rounded-lg mb-3">
              <img
                src={song.coverUrl}
                className="aspect-square object-cover w-full
                           group-hover:scale-110 transition duration-500"
              />
            </div>

            <p className="font-semibold truncate">{song.title}</p>
            <p className="text-sm text-gray-300 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
