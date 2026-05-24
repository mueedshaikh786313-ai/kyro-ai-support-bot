import { Link } from "@tanstack/react-router";

export function Logo({ showText = true, size = "md" }: { showText?: boolean; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "sm" ? 28 : size === "lg" ? 56 : 36;
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <LogoMark size={dimensions} />
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight text-gradient-cyan">
          KYRO AI
        </span>
      )}
    </Link>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all group-hover:scale-110"
      style={{ filter: "drop-shadow(0 0 12px oklch(0.82 0.18 215 / 0.6))" }}
    >
      <defs>
        <linearGradient id="kyroSteel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f4f8" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="kyroEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
      </defs>
      {/* Left vertical bar of K */}
      <path d="M14 8 L20 8 L20 56 L14 56 Z" fill="url(#kyroSteel)" />
      {/* Upper diagonal of K */}
      <path d="M22 30 L44 8 L52 8 L28 32 Z" fill="url(#kyroSteel)" />
      {/* Lower diagonal of K */}
      <path d="M22 34 L28 32 L52 56 L44 56 Z" fill="url(#kyroSteel)" />
      {/* Eye outline */}
      <ellipse cx="32" cy="32" rx="11" ry="6" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9" />
      {/* Eye pupil */}
      <circle cx="32" cy="32" r="3" fill="url(#kyroEye)" />
      <circle cx="32" cy="32" r="3" fill="#22d3ee" opacity="0.5">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
