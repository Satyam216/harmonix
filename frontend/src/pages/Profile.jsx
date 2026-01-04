import useUserProfile from "../hooks/useUserProfile";

export default function Profile() {
  const p = useUserProfile();

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-zinc-900 p-6 rounded max-w-md">
        <p><b>Name:</b> {p?.name}</p>
        <p><b>Email:</b> {p?.email}</p>
        <p><b>Country:</b> {p?.country}</p>
        <p><b>Plan:</b> {p?.subscription || "Free"}</p>
      </div>
    </div>
  );
}
