import { useState } from "react";
import { getAuth } from "firebase/auth";
import { apiClient } from "../../api/apiClient";
import { Music, Upload, Image, FileAudio, User, CheckCircle2, Loader2, XCircle, Disc, Tag, FileText } from "lucide-react";

export default function UploadSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Preview handlers
  const [audioPreview, setAudioPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
      setAudioPreview(file.name);
      setError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    // Only check required fields
    if (!title || !artist || !audio || !cover) {
      setError("Please fill all required fields (Title, Artist, Audio, Cover)");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);
      setError("");
      setUploadProgress(0);

      // Stage 1: Getting token
      setUploadStage("Authenticating...");
      setUploadProgress(10);
      const token = await getAuth().currentUser.getIdToken();

      // Stage 2: Preparing files
      setUploadStage("Preparing files...");
      setUploadProgress(20);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      
      // Add optional fields only if they have values
      if (album) formData.append("album", album);
      if (genre) formData.append("genre", genre);
      if (lyrics) formData.append("lyrics", lyrics);
      
      formData.append("audio", audio);
      formData.append("cover", cover);

      // Stage 3: Uploading
      setUploadStage("Uploading audio file...");
      setUploadProgress(40);

      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadStage("Uploading cover image...");
      setUploadProgress(60);

      await apiClient("/api/upload/song", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Stage 4: Finalizing
      setUploadStage("Finalizing upload...");
      setUploadProgress(90);
      await new Promise(resolve => setTimeout(resolve, 300));

      setUploadProgress(100);
      setUploadStage("Upload complete!");
      setSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setArtist("");
        setAlbum("");
        setGenre("");
        setLyrics("");
        setAudio(null);
        setCover(null);
        setAudioPreview("");
        setImagePreview("");
        setUploadProgress(0);
        setUploadStage("");
        setSuccess(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed. Please try again.");
      setUploadStage("");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-12 h-12 text-pink-400 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Upload New Song
              </h1>
            </div>
            <p className="text-gray-300 text-lg">Share your music with the world</p>
          </div>

          {/* Form Container */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-slideUp">
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3 animate-fadeIn">
                <CheckCircle2 className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-300 font-semibold">Song uploaded successfully! 🎉</p>
                  <p className="text-green-400 text-sm">Your track is now live on the platform</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3 animate-fadeIn">
                <XCircle className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-semibold">Upload Failed</p>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {loading && (
              <div className="mb-6 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl animate-fadeIn">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  <p className="text-purple-300 font-semibold">{uploadStage}</p>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-400">Uploading...</p>
                  <p className="text-sm text-purple-400 font-semibold">{uploadProgress}%</p>
                </div>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Basic Info */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 mb-4">
                  <Music className="w-5 h-5" />
                  Basic Information
                </h3>

                {/* Song Title */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <Music className="w-4 h-4" />
                    Song Title <span className="text-pink-400">*</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Enter the name of your song</p>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Midnight Dreams"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Artist Name */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <User className="w-4 h-4" />
                    Artist Name <span className="text-pink-400">*</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Who performed this song?</p>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Album Name */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <Disc className="w-4 h-4" />
                    Album Name
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Optional: Which album is this from?</p>
                  <input
                    type="text"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    placeholder="e.g., Summer Vibes 2024"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Genre */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <Tag className="w-4 h-4" />
                    Genre
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Optional: Music category</p>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="e.g., Pop, Rock, Jazz"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Middle Column - Files */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5" />
                  Media Files
                </h3>

                {/* Audio File Upload */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <FileAudio className="w-4 h-4" />
                    Audio File <span className="text-pink-400">*</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Upload your song file (MP3, WAV, FLAC)</p>
                  <label className="block cursor-pointer">
                    <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 hover:border-purple-500/50 hover:bg-white/5 transition-all group">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
                          <FileAudio className="w-8 h-8 text-purple-400" />
                        </div>
                        {audioPreview ? (
                          <div className="text-center">
                            <p className="text-green-400 font-semibold text-sm mb-1">✓ File selected</p>
                            <p className="text-gray-400 text-xs truncate max-w-[200px]">{audioPreview}</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-white font-semibold">Click to upload audio</p>
                            <p className="text-gray-400 text-xs mt-1">or drag and drop</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                {/* Cover Image Upload */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <Image className="w-4 h-4" />
                    Cover Image <span className="text-pink-400">*</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Upload album artwork (JPG, PNG - min 500x500px)</p>
                  <label className="block cursor-pointer">
                    <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 hover:border-pink-500/50 hover:bg-white/5 transition-all group overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {imagePreview ? (
                        <div className="flex flex-col items-center gap-3">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-32 h-32 object-cover rounded-lg shadow-lg"
                          />
                          <p className="text-green-400 font-semibold text-sm">✓ Image uploaded</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 bg-pink-500/20 rounded-full group-hover:bg-pink-500/30 transition-colors">
                            <Image className="w-8 h-8 text-pink-400" />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">Click to upload image</p>
                            <p className="text-gray-400 text-xs mt-1">or drag and drop</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Right Column - Lyrics */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5" />
                  Additional Content
                </h3>

                {/* Lyrics */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-2">
                    <FileText className="w-4 h-4" />
                    Song Lyrics
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Optional: Add lyrics for your song</p>
                  <textarea
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    rows={16}
                    placeholder="Paste your song lyrics here...

Verse 1:
In the midnight hour...

Chorus:
Dancing under the stars..."
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                       text-white font-bold rounded-xl flex items-center justify-center gap-3 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                  <span className="relative z-10">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Upload Song</span>
                </>
              )}
            </button>

            {/* Info Text */}
            <div className="text-center text-gray-400 text-xs mt-4 space-y-1">
              <p>
                <span className="text-pink-400">*</span> Required fields
              </p>
              <p className="text-gray-500">Optional fields can be left empty and added later</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}