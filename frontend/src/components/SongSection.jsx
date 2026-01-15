import { Heart } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddToPlaylistMenu from "./AddToPlaylistMenu";

export default function SongSection({ title, tracks }) {
  const { playTrack } = useAudio();
  const { user } = useAuth();

  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    if (!user || !tracks.length) return;

    const checkLikes = async () => {
      const map = {};
      for (let t of tracks) {
        const ref = doc(db, "likedSongs", user.uid, "songs", t.id);
        const snap = await getDoc(ref);
        map[t.id] = snap.exists();
      }
      setLikedMap(map);
    };

    checkLikes();
  }, [tracks, user]);

  if (!tracks.length) return null;

  const toggleLike = async (e, song) => {
    e.stopPropagation();

    const ref = doc(db, "likedSongs", user.uid, "songs", song.id);

    if (likedMap[song.id]) {
      await deleteDoc(ref);
      setLikedMap((prev) => ({ ...prev, [song.id]: false }));
    } else {
      await setDoc(ref, {
        title: song.title,
        artist: song.artist,
        coverUrl: song.coverUrl,
        audioUrl: song.audioUrl,
        createdAt: new Date(),
      });
      setLikedMap((prev) => ({ ...prev, [song.id]: true }));
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => playTrack(t)}
            className="
              relative group
              bg-zinc-800 p-4 rounded-xl
              hover:bg-zinc-700
              transition-all duration-300
              cursor-pointer
            "
          >
            <img
              src={t.coverUrl}
              className="rounded-lg mb-2 aspect-square object-cover"
            />

            <p className="font-semibold truncate text-white">{t.title}</p>
            <p className="text-sm text-gray-400 truncate">{t.artist}</p>

            {/* ❤️ + ➕ ICONS (BOTTOM RIGHT) */}
            <div
              className="
                absolute bottom-3 right-3
                flex items-center gap-2
                bg-black/50 backdrop-blur-md
                px-2 py-1.5 rounded-full
                shadow-lg
                opacity-0 scale-95
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-300
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❤️ LIKE */}
              <button
                onClick={(e) => toggleLike(e, t)}
                className={`
                  p-1.5 rounded-full
                  transition-all duration-300
                  hover:scale-110
                  ${
                    likedMap[t.id]
                      ? "text-green-500 bg-green-500/20"
                      : "text-white hover:text-green-400 hover:bg-white/10"
                  }
                `}
              >
                <Heart
                  size={16}
                  fill={likedMap[t.id] ? "currentColor" : "none"}
                />
              </button>

              {/* ➕ ADD TO PLAYLIST */}
              <div
                className="
                  p-1.5 rounded-full
                  text-white
                  hover:text-blue-400
                  hover:bg-white/10
                  transition-all duration-300
                  hover:scale-110
                "
              >
                <AddToPlaylistMenu song={t} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
