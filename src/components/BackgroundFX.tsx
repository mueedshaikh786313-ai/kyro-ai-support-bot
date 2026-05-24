export function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Cyan orb top */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.18 215 / 0.18), transparent 60%)",
        }}
      />
      {/* Side orbs */}
      <div
        className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.15 220 / 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.18 210 / 0.12), transparent 70%)",
          animationDelay: "2s",
        }}
      />
    </div>
  );
}
