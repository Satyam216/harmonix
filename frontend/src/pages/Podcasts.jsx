import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Podcasts() {
  const [pods, setPods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "podcasts")).then(snap =>
      setPods(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl mb-6">Podcasts</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pods.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/podcast/${p.id}`)}
            className="bg-zinc-800 p-4 rounded cursor-pointer"
          >
            <img src={p.coverUrl} className="rounded mb-2" />
            <p className="font-semibold">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
