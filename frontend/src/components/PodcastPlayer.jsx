import ReactPlayer from "react-player";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { usePodcast } from "../context/PodcastContext";
import { useState } from "react";

export default function PodcastPlayer() {
  const { current, open, closePodcast } = usePodcast();
  const [full, setFull] = useState(false);
  const [error, setError] = useState(null);

  if (!open || !current) return null;
  
  console.log("Podcast object:", current);
  console.log("Video URL:", current.videoUrl);

  return (
    <div
      className={`
        fixed top-0 right-0 z-50 bg-black text-white
        ${full ? "w-full h-full" : "w-[420px] h-[320px]"}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <p className="font-semibold truncate">{current.title}</p>

        <div className="flex gap-3">
          <button onClick={() => setFull(!full)}>
            {full ? <Minimize2 /> : <Maximize2 />}
          </button>
          <button onClick={closePodcast}>
            <X />
          </button>
        </div>
      </div>

      {/* VIDEO */}
      <div className="relative w-full bg-black" style={{ height: full ? 'calc(100vh - 280px)' : '240px' }}>
        {error && (
          <div className="flex items-center justify-center h-full text-red-500">
            Error loading video: {error}
          </div>
        )}
        <ReactPlayer
          url={current.videoUrl}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          onError={(e) => {
            console.error("ReactPlayer Error:", e);
            setError(e.toString());
          }}
          onReady={() => console.log("Player ready")}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                crossOrigin: 'anonymous'
              },
              forceVideo: true
            }
          }}
        />
      </div>

      {/* DETAILS */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
        <h2 className="text-xl font-bold mb-2">{current.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{current.host}</p>
        <p className="text-sm leading-relaxed text-gray-300">
          {current.description}
        </p>
      </div>
    </div>
  );
}