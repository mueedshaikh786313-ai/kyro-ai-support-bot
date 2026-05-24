import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Cinematic AI Core orb.
 * Pure CSS/SVG layers + framer-motion — no WebGL dependency, but feels 3D.
 * Layers (back -> front):
 *  - Ambient halo glow
 *  - Orbital rings (rotating, perspective tilted)
 *  - Metallic sphere body (radial gradients + specular highlight)
 *  - Inner cyan energy core (breathing pulse)
 *  - Surface reflection sheen
 *  - Floating particles
 */
export function HeroOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const tx = useTransform(sx, [-1, 1], [-12, 12]);
  const ty = useTransform(sy, [-1, 1], [-12, 12]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-square max-w-[560px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.82 0.18 215 / 0.55), oklch(0.82 0.18 215 / 0.1) 40%, transparent 70%)",
        }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating wrapper */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, x: tx, y: ty, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Orbital rings */}
        {[
          { size: 100, dur: 28, tilt: 72, delay: 0, opacity: 0.35 },
          { size: 86, dur: 22, tilt: 64, delay: 0.4, opacity: 0.5 },
          { size: 116, dur: 38, tilt: 80, delay: 0.8, opacity: 0.22 },
        ].map((r, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${r.size}%`,
              height: `${r.size}%`,
              marginLeft: `-${r.size / 2}%`,
              marginTop: `-${r.size / 2}%`,
              borderColor: `oklch(0.82 0.18 215 / ${r.opacity})`,
              borderWidth: 1,
              transform: `rotateX(${r.tilt}deg)`,
              boxShadow: `0 0 40px oklch(0.82 0.18 215 / ${r.opacity * 0.5})`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: r.dur, repeat: Infinity, ease: "linear", delay: r.delay }}
          />
        ))}

        {/* Sphere */}
        <div className="absolute inset-[18%] rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, oklch(0.45 0.08 220) 0%, oklch(0.15 0.04 240) 45%, oklch(0.05 0.02 240) 100%)",
            boxShadow:
              "inset -30px -40px 80px oklch(0 0 0 / 0.8), inset 20px 30px 60px oklch(0.82 0.18 215 / 0.25), 0 30px 80px oklch(0 0 0 / 0.7)",
          }}
        >
          {/* Inner cyan core */}
          <motion.div
            aria-hidden
            className="absolute inset-[20%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.95 0.06 215) 0%, oklch(0.82 0.18 215) 30%, oklch(0.5 0.16 220 / 0.4) 60%, transparent 80%)",
              filter: "blur(4px)",
            }}
            animate={{ scale: [0.92, 1.05, 0.92], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Specular highlight */}
          <div aria-hidden className="absolute top-[10%] left-[18%] w-[40%] h-[28%] rounded-full"
            style={{
              background: "radial-gradient(ellipse, oklch(1 0 0 / 0.35), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          {/* Rim light */}
          <div aria-hidden className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 70% 80%, oklch(0.82 0.18 215 / 0.4), transparent 35%)",
            }}
          />
        </div>

        {/* Particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 46 + (i % 3) * 4;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: 4,
                height: 4,
                background: "oklch(0.82 0.18 215)",
                boxShadow: "0 0 12px oklch(0.82 0.18 215)",
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
              transition={{ duration: 2.5 + (i % 4) * 0.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
