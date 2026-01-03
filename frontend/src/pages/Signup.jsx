import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    country: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      ...form,
      uid: userCred.user.uid,
      role: "user",
      createdAt: new Date(),
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex bg-[#0f172a] text-white">
      <AnimatedBackground />

      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white text-black rounded-2xl p-8 shadow-xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Create account</h2>

          {["name","email","password","mobile","age","country"].map((f) => (
            <input
              key={f}
              name={f}
              type={f === "password" ? "password" : "text"}
              placeholder={f.toUpperCase()}
              onChange={handleChange}
              className="w-full mb-3 p-3 rounded bg-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
            />
          ))}

          <button
            onClick={handleSignup}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign up
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 cursor-pointer ml-1 font-semibold"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block w-1/2 bg-[url('https://images.pexels.com/photos/3756943/pexels-photo-3756943.jpeg')] bg-cover bg-center" />
    </div>
  );
}
