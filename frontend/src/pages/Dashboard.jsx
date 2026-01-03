import Sidebar from "../components/Sidebar";
import SongGrid from "../components/SongGrid";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-1">Good Evening</h1>
        <p className="text-gray-400 mb-6">Let’s continue your journey</p>

        <SongGrid title="Continue Listening" />
        <SongGrid title="Trending Now" />
      </main>
    </div>
  );
}
