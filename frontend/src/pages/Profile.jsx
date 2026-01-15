import { useEffect, useState } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Camera, Pencil } from "lucide-react";

export default function Profile() {
  const p = useUserProfile();

  const [form, setForm] = useState({
    name: "",
    country: "",
    age: "",
    avatar: "",
    subscription: "",
  });

  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔁 Load data from Firestore profile
  useEffect(() => {
    if (!p) return;

    setForm({
      name: p.name || "",
      country: p.country || "",
      age: p.age || "",
      avatar: p.avatar || "",
      subscription: p.subscription || "Free",
    });
  }, [p]);

  if (!p) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 📸 Upload avatar
  const handleImage = async (file) => {
    setLoading(true);
    const url = await uploadToCloudinary(file, "image");
    setForm((prev) => ({ ...prev, avatar: url }));
    setLoading(false);
  };

  // 💾 Save profile
  const saveProfile = async () => {
    setLoading(true);

    await updateDoc(doc(db, "users", p.uid), {
      ...form,
    });

    setEditing({});
    setLoading(false);
  };

  // 🧩 Reusable Row
  const Row = ({ label, value, field, editable = true }) => (
    <div className="flex items-center justify-between border-b border-white/10 py-3">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        {editing[field] ? (
          <input
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="mt-1 bg-black border border-white/10 px-3 py-1 rounded w-full"
          />
        ) : (
          <p className="text-white">{value || "--"}</p>
        )}
      </div>

      {editable && (
        <Pencil
          size={16}
          className="text-gray-400 hover:text-white cursor-pointer"
          onClick={() =>
            setEditing((prev) => ({ ...prev, [field]: true }))
          }
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-zinc-900 w-[420px] rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={form.avatar || "/avatar.png"}
              className="w-16 h-16 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full cursor-pointer">
              <Camera size={14} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </label>
          </div>

          <div>
            <p className="font-semibold">{form.name || "Your name"}</p>
            <p className="text-sm text-gray-400">{p.email}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-1">

          <Row label="Name" value={form.name} field="name" />
          <Row label="Country" value={form.country} field="country" />
          <Row label="Age" value={form.age} field="age" />
          <Row label="Subscription" value={form.subscription} field="subscription" />

          {/* NON-EDITABLE */}
          <Row label="Email" value={p.email} editable={false} />
          <Row
            label="Mobile"
            value={p.mobile || "--"}
            editable={false}
          />
          <Row
            label="Account Created"
            value={
              p.createdAt
                ? new Date(p.createdAt.seconds * 1000).toDateString()
                : "--"
            }
            editable={false}
          />
        </div>

        {/* SAVE */}
        <button
          onClick={saveProfile}
          disabled={loading}
          className="mt-6 w-full bg-green-500 py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
