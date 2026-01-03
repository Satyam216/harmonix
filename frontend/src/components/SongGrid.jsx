export default function SongGrid({ title }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
            <div className="h-32 bg-zinc-700 rounded mb-3" />
            <p className="font-semibold">Song {i}</p>
            <p className="text-sm text-gray-400">Artist</p>
          </div>
        ))}
      </div>
    </>
  );
}
