import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import SearchBar from "../components/SearchBar";
import SongSection from "../components/SongSection";
import BottomPlayer from "../components/BottomPlayer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [allSongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "tracks")).then((snap) => {
      setAllSongs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const mostlyPlayed = [...allSongs].sort((a,b)=>b.playCount-a.playCount).slice(0,5);
  const recentlyPlayed = [...allSongs].slice(0,5);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 p-6 pb-32 overflow-y-auto">
        <DashboardHeader />

        <SearchBar value={search} onChange={setSearch} />

        <SongSection title="All Songs" tracks={allSongs.filter(s=>s.title.includes(search))} />
        <SongSection title="Mostly Played" tracks={mostlyPlayed} />
        <SongSection title="Recently Played" tracks={recentlyPlayed} />
      </main>

      <BottomPlayer />
    </div>
  );
}
