import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BottomPlayer from "../components/BottomPlayer";
import PodcastPlayer from "../components/PodcastPlayer";
import { ChevronRight } from "lucide-react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* SIDEBAR (absolute, not affecting layout) */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-40
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {/* TOGGLE ARROW */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="
          fixed top-1/2 left-0 z-50
          bg-zinc-800 hover:bg-zinc-700
          p-2 rounded-r-full
          transition-all duration-300
        "
        style={{ transform: "translateY(-50%)" }}
      >
        <ChevronRight
          className={`transition-transform duration-300 ${
            sidebarOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* MAIN CONTENT */}
      <main
        className={`
          transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-0"}
          pb-24
        `}
      >
        {children}
      </main>

      {/* 🎥 PODCAST PLAYER (VIDEO) */}
      <div
        className={`
          fixed bottom-24 right-0 z-40
          transition-all duration-300
          ${sidebarOpen ? "left-64" : "left-0"}
        `}
      >
        <PodcastPlayer sidebarOpen={sidebarOpen} />
      </div>

      {/* BOTTOM PLAYER */}
      <div
            className={`
                fixed bottom-0 right-0 z-30
                transition-all duration-300
                ${sidebarOpen ? "left-64" : "left-0"}
            `}
            >
            <BottomPlayer sidebarOpen={sidebarOpen} />
        </div>


    </div>
  );
}
