import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { to: "/features", label: "Features" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/integrations", label: "Integrations" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-300",
          scrolled && "max-w-5xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all",
            scrolled ? "glass shadow-card" : "bg-transparent"
          )}
        >
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all hover:shadow-glow"
              style={{ boxShadow: "0 0 20px oklch(0.82 0.18 215 / 0.3)" }}
            >
              See Demo
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-primary"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 mt-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground"
            >
              See Demo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
