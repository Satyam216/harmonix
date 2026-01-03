import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex bg-[#0f172a] text-white">
      <AnimatedBackground />

      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white text-black rounded-2xl p-8 shadow-xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">Please enter your details</p>

          <input
            className="w-full mb-4 p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-4 p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign in
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?
            <span
              onClick={() => navigate("/Signup")}
              className="text-green-600 cursor-pointer ml-1 font-semibold"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block w-1/2 bg-[url('https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40 flex items-end p-10">
          <h1 className="text-4xl font-bold leading-tight">
            Find Your Next <br /> Sound in Nature
          </h1>
        </div>
      </div>
    </div>
  );
}
