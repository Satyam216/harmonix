export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search songs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded bg-zinc-800 text-white mb-6 outline-none"
    />
  );
}
