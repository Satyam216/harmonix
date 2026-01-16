import { useState } from "react";
import { getAuth } from "firebase/auth";
import { apiClient } from "../../api/apiClient";
import { Mic, UploadCloud } from "lucide-react";

export default function UploadPodcast() {
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !host || !description || !video || !cover) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const token = await getAuth().currentUser.getIdToken();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("host", host);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("cover", cover);

      await apiClient("/api/upload/podcast", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      alert("Podcast uploaded successfully 🎙️");

      // reset
      setTitle("");
      setHost("");
      setDescription("");
      setVideo(null);
      setCover(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Podcast upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start p-6">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl p-8">

        {/* 🔥 HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-600 p-3 rounded-xl">
            <Mic />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Upload Podcast</h1>
            <p className="text-sm text-gray-400">
              Add a new podcast episode for users
            </p>
          </div>
        </div>

        {/* 📄 FORM */}
        <div className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400">
              Podcast Title
            </label>
            <input
              className="w-full mt-1 p-3 bg-black border border-white/10 rounded focus:outline-none"
              placeholder="Eg. Morning Motivation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* HOST */}
          <div>
            <label className="text-sm text-gray-400">
              Host Name
            </label>
            <input
              className="w-full mt-1 p-3 bg-black border border-white/10 rounded"
              placeholder="Eg. Satyam"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400">
              Podcast Description
            </label>
            <textarea
              rows={4}
              className="w-full mt-1 p-3 bg-black border border-white/10 rounded resize-none"
              placeholder="Briefly describe the podcast episode"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Video */}
          <div>
            <label className="text-sm text-gray-400">
              Podcast Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-300"
            />
          </div>

          {/* COVER */}
          <div>
            <label className="text-sm text-gray-400">
              Podcast Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-300"
            />
          </div>
        </div>

        {/* 🚀 SUBMIT */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="
            mt-6 w-full flex items-center justify-center gap-2
            bg-purple-600 hover:bg-purple-700
            py-3 rounded-xl font-semibold
            disabled:opacity-60 transition
          "
        >
          <UploadCloud size={18} />
          {loading ? "Uploading..." : "Upload Podcast"}
        </button>
      </div>
    </div>
  );
}
