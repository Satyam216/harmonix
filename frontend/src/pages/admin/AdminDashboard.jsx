import { useNavigate } from "react-router-dom";
import { Music, Podcast, Sparkles, Upload } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
        {/* Header with Sparkle Effect */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <h1 className="mb-2 text-5xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              What do you want to upload today?
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>
          <p className="text-gray-300 text-lg">Manage your music empire with style</p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl animate-slideUp">
          {/* Upload Song Card */}
          <div className="group relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <button
              onClick={() => navigate("/admin/uploadSong")}
              className="relative w-full h-64 bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-8 
                         flex flex-col items-center justify-center gap-4
                         transform transition-all duration-500 hover:scale-105 hover:rotate-1
                         border border-green-400/20 shadow-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                <Music className="w-20 h-20 text-white relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Upload Song</h2>
                <p className="text-green-100 text-sm">Add new tracks to your collection</p>
              </div>
              <Upload className="w-6 h-6 text-white/80 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Upload Podcast Card */}
          <div className="group relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <button
              onClick={() => navigate("/admin/uploadPodcast")}
              className="relative w-full h-64 bg-gradient-to-br from-purple-500/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-8 
                         flex flex-col items-center justify-center gap-4
                         transform transition-all duration-500 hover:scale-105 hover:-rotate-1
                         border border-purple-400/20 shadow-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <Podcast className="w-20 h-20 text-white relative z-10 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Upload Podcast</h2>
                <p className="text-purple-100 text-sm">Share your voice with the world</p>
              </div>
              <Upload className="w-6 h-6 text-white/80 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}