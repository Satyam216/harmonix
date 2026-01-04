import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";

export default function PodcastDetail() {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const { playTrack } = useAudio();

  useEffect(() => {
    getDocs(collection(db, "podcasts", id, "episodes"))
      .then(snap =>
        setEpisodes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      );
  }, [id]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-6">Episodes</h1>

      {episodes.map(ep => (
        <div
          key={ep.id}
          onClick={() => playTrack(ep)}
          className="p-4 bg-zinc-800 rounded mb-3 cursor-pointer"
        >
          {ep.title}
        </div>
      ))}
    </div>
  );
}
