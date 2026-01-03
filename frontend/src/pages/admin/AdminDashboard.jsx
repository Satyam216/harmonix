import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <Link
        to="/admin/upload"
        className="inline-block bg-green-500 px-6 py-3 rounded font-bold"
      >
        Upload New Song
      </Link>
    </div>
  );
}
