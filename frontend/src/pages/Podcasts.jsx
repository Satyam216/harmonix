import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PodcastCard from "../components/PodcastCard";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "podcasts")).then((snap) => {
      setPodcasts(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      );
    });
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Podcasts</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {podcasts.map(p => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
    </div>
  );
}
