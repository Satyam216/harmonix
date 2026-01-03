export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-pulse delay-200" />
    </div>
  );
}
