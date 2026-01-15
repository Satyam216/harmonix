import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function usePlaylists() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchPlaylists = async () => {
      const q = query(
        collection(db, "playlists"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);

      const data = await Promise.all(
        snap.docs.map(async (docSnap) => {
          // 🔹 songs count
          const songsSnap = await getDocs(
            collection(db, "playlists", docSnap.id, "songs")
          );

          return {
            id: docSnap.id,
            ...docSnap.data(),
            songCount: songsSnap.size, // ✅ REAL COUNT
          };
        })
      );

      setPlaylists(data);
    };

    fetchPlaylists();
  }, [user]);

  return playlists;
}
