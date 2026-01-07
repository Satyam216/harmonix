import { Heart } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

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
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => playTrack(t)}
            className="relative bg-zinc-800 p-4 rounded hover:bg-zinc-700 cursor-pointer"
          >
            <img
              src={t.coverUrl}
              className="rounded mb-2 aspect-square object-cover"
            />

            <p className="font-semibold truncate">{t.title}</p>
            <p className="text-sm text-gray-400 truncate">{t.artist}</p>

            {/* ❤️ LIKE */}
            <button
              onClick={(e) => toggleLike(e, t)}
              className={`absolute top-3 right-3 ${
                likedMap[t.id] ? "text-green-500" : "text-white"
              }`}
            >
              <Heart
                size={18}
                fill={likedMap[t.id] ? "currentColor" : "none"}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
