import { useAudio } from "../context/AudioContext";

export default function SongSection({ title, tracks }) {
  const { playTrack } = useAudio();

  if (!tracks.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => playTrack(t)}
            className="bg-zinc-800 p-4 rounded hover:bg-zinc-700 cursor-pointer"
          >
            <img src={t.coverUrl} className="rounded mb-2" />
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm text-gray-400">{t.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
