import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cinematic boot sequence overlay: black screen -> "Initializing KYRO AI..." -> fade out.
 * Shows once per session.
 */
export function HeroIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("kyro-intro-played")) return;
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem("kyro-intro-played", "1");
      setShow(false);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="block w-2 h-2 rounded-full"
              style={{ background: "oklch(0.82 0.18 215)", boxShadow: "0 0 20px oklch(0.82 0.18 215)" }}
              animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="font-display text-sm tracking-[0.3em] uppercase text-primary/90"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Initializing Kyro AI
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
