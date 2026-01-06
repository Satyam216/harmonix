import { useState } from "react";
import { getAuth } from "firebase/auth";
import { apiClient } from "../../api/apiClient";

export default function UploadSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !artist || !audio || !cover) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const token = await getAuth().currentUser.getIdToken();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("audio", audio);
      formData.append("cover", cover);

      await apiClient("/api/upload/song", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      alert("Song uploaded successfully 🎉");

      // reset
      setTitle("");
      setArtist("");
      setAudio(null);
      setCover(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Upload Song (Admin)</h1>

      <div className="max-w-md space-y-4">
        <input
          placeholder="Song Title"
          className="w-full p-3 bg-zinc-800 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Artist Name"
          className="w-full p-3 bg-zinc-800 rounded"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-green-500 text-black py-3 rounded font-bold disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </div>
    </div>
  );
}
