import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin/uploadSong")}
          className="bg-green-500 px-6 py-3 rounded"
        >
          Upload Song
        </button>

        <button
          onClick={() => navigate("/admin/uploadPodcast")}
          className="bg-purple-500 px-6 py-3 rounded"
        >
          Upload Podcast
        </button>
      </div>
    </div>
  );
}
