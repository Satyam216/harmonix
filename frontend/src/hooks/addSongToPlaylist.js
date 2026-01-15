import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function useAddSongToPlaylist() {
  const { user } = useAuth();

  const addSongToPlaylist = async (playlistId, song) => {
    if (!user || !playlistId || !song?.id) return;

    await setDoc(
      doc(db, "playlists", playlistId, "songs", song.id),
      {
        trackId: song.id,      // ✅ reference only
        addedAt: serverTimestamp(),
      }
    );
  };

  return { addSongToPlaylist };
}
