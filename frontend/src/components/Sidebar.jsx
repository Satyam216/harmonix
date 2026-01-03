import { Home, Search, Heart, List, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6">🎧 HARMONIX</h2>

      {[
        { icon: Home, label: "Home" },
        { icon: Search, label: "Search" },
        { icon: Heart, label: "Liked" },
        { icon: List, label: "Playlists" },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 cursor-pointer">
          <Icon size={18} /> {label}
        </div>
      ))}

      <div className="mt-auto text-red-500 flex gap-3 p-3 cursor-pointer">
        <LogOut size={18} /> Logout
      </div>
    </aside>
  );
}
