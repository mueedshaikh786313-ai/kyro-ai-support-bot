import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              AI customer support trained on your business data. Always on. Always learning.
            </p>
          </div>

          <FooterCol title="Product" links={[
            { to: "/features", label: "Features" },
            { to: "/use-cases", label: "Use Cases" },
            { to: "/integrations", label: "Integrations" },
            { to: "/pricing", label: "Pricing" },
          ]} />

          <FooterCol title="Company" links={[
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/contact", label: "See Demo" },
          ]} />

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<Twitter size={16} />} />
              <SocialLink href="#" icon={<Linkedin size={16} />} />
              <SocialLink href="mailto:kyroforbuisness@gmail.com" icon={<Mail size={16} />} />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kyro AI. All rights reserved.</p>
          <p>Crafted with intelligence. ✦</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
    >
      {icon}
    </a>
  );
}
