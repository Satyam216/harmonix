import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PlaylistCover from "./PlaylistCover";

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadCovers = async () => {
      const snap = await getDocs(
        collection(db, "playlists", playlist.id, "songs")
      );

      const trackIds = snap.docs.slice(0, 4).map(d => d.data().trackId);

      const covers = await Promise.all(
        trackIds.map(async (id) => {
          const t = await getDoc(doc(db, "tracks", id));
          return t.exists() ? t.data().coverUrl : null;
        })
      );

      setImages(covers.filter(Boolean));
    };

    loadCovers();
  }, [playlist.id]);

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="
        group cursor-pointer
        bg-zinc-900 hover:bg-zinc-800
        rounded-xl p-3 transition
      "
    >
      {/* COVER (smaller) */}
      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
        <PlaylistCover images={images} />
      </div>

      {/* TEXT */}
      <p className="text-sm font-semibold truncate">
        {playlist.name}
      </p>
      <p className="text-xs text-gray-400">
        {playlist.songCount} songs
      </p>
    </div>
  );
}
