import { Home, Search, Heart, List, LogOut, Mic } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 px-4 hidden md:flex flex-col">

      {/* LOGO – TOP MOST */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer mb-1"
      >
        <img
          src="/harmonix.png"
          alt="Harmonix Logo"
          className="w-full max-w-[220px] object-contain"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1 mt-2">
        {[
          { icon: Home, label: "Home", path: "/" },
          { icon: Search, label: "Search", path: "/search" },
          { icon: Heart, label: "Liked", path: "/liked" },
          { icon: List, label: "Playlists", path: "/playlists" },
          { icon: Mic, label: "Podcasts", path: "/podcasts" },
        ].map(({ icon: Icon, label, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="group flex items-center gap-4 px-3 py-2 rounded-md cursor-pointer
                       text-gray-300 hover:text-white
                       hover:bg-zinc-800 transition-all"
          >
            <Icon size={20} className="group-hover:text-green-500" />
            <span className="font-medium text-[15px]">{label}</span>
          </div>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <div
          onClick={handleLogout}
          className="group flex items-center gap-4 px-3 py-4 rounded-md cursor-pointer
                     text-red-400 hover:text-red-500
                     hover:bg-zinc-800 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-[15px]">Logout</span>
        </div>
      </div>
    </aside>
  );
}
