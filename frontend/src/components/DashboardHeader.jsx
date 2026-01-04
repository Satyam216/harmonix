import { useState } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function DashboardHeader() {
  const profile = useUserProfile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">
        Enjoy your music{profile?.name && `, ${profile.name.split(" ")[0]}`}
      </h1>

      {/* Profile */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer text-black font-bold"
        >
          {profile?.name?.[0]}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-zinc-900 text-white rounded shadow-lg">
            <div
              onClick={() => navigate("/profile")}
              className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"
            >
              Profile
            </div>
            <div className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              Account
            </div>
            <div className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              Settings
            </div>
            <div
              onClick={() => signOut(auth)}
              className="px-4 py-2 hover:bg-zinc-800 cursor-pointer text-red-400"
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
