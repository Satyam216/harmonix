import {
  Home,
  Search,
  Heart,
  List,
  LogOut,
  Mic,
  Settings,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Heart, label: "Liked", path: "/liked" },
    { icon: List, label: "Playlists", path: "/playlists" },
    { icon: Mic, label: "Podcasts", path: "/podcasts" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 px-4 flex flex-col">

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="
          cursor-pointer
          flex justify-center
        "
      >
        <img
          src="/harmonix.png"
          alt="Harmonix Logo"
          className="
            w-[200px]
            object-contain
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>
       
      <div className="pb-8 pt border-t border-white/5"></div>

      {/* NAVIGATION */}
      <nav className="mt-2 flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <div
              key={label}
              onClick={() => navigate(path)}
              className={`
                group relative
                flex items-center gap-4
                px-4 py-2.5
                rounded-lg cursor-pointer
                transition-all duration-300
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {/* Left indicator */}
              <span
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-6 w-[3px] rounded-r
                  bg-green-500
                  transition-opacity
                  ${isActive ? "opacity-100" : "opacity-0"}
                `}
              />

              <Icon
                size={20}
                className="
                  transition-transform duration-300
                  group-hover:scale-110
                  group-hover:text-green-500
                "
              />
              <span className="text-[15px] font-medium tracking-wide">
                {label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* BOTTOM ACTIONS */}
      <div className="mt-auto pb-6 pt-4 border-t border-white/5 flex flex-col gap-1">
        {/* SETTINGS */}
        <div
          onClick={() => navigate("/settings")}
          className="
            group flex items-center gap-4
            px-4 py-2.5
            rounded-lg cursor-pointer
            text-gray-400
            hover:text-white hover:bg-white/5
            transition-all
          "
        >
          <Settings
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span className="text-[15px] font-medium">Settings</span>
        </div>

        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="
            group flex items-center gap-4
            px-4 py-2.5
            rounded-lg cursor-pointer
            text-red-400
            hover:text-red-500 hover:bg-red-500/10
            transition-all
          "
        >
          <LogOut size={20} />
          <span className="text-[15px] font-medium">Logout</span>
        </div>
      </div>
    </aside>
  );
}
