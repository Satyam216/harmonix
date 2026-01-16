import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAudio } from "../context/AudioContext";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const { playTrack } = useAudio();

  useEffect(() => {
    getDocs(collection(db, "podcasts")).then(snap => {
      setPodcasts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Podcasts</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {podcasts.map(p => (
          <div
            key={p.id}
            onClick={() => playTrack(p)}
            className="bg-zinc-800 p-4 rounded cursor-pointer"
          >
            <img src={p.coverUrl} className="rounded mb-2" />
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-gray-400">{p.host}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
