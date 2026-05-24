import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Target, Heart, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Kyro AI" },
      { name: "description", content: "We're building the future of customer support — AI agents that understand your business as well as you do." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="text-xs uppercase tracking-widest text-primary mb-3">About</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter">
          We see what <br /><span className="text-gradient-cyan glow-text">your customers need.</span>
        </h1>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex justify-center my-12"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-2xl opacity-50"
            style={{ background: "radial-gradient(circle, oklch(0.82 0.18 215 / 0.5), transparent 70%)" }} />
          <div className="relative"><LogoMark size={120} /></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="glass rounded-3xl p-8 sm:p-12 my-12"
      >
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Eye className="text-primary" size={22} /> The eye in our logo
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The eye inside Kyro's K isn't just design — it represents our core belief.
          Great support starts with truly <span className="text-primary">seeing</span> your customer:
          their question, their context, their urgency. Kyro is built to perceive every nuance of
          every conversation, then respond like the best version of your team — always.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5 my-12">
        {[
          { icon: Target, t: "Mission", d: "Make world-class support accessible to every business, no matter the size." },
          { icon: Eye, t: "Vision", d: "A world where waiting on hold is history — every question answered instantly, in any language." },
          { icon: Heart, t: "Values", d: "Customer obsession. Radical clarity. Build with care, ship with confidence." },
        ].map((b, i) => (
          <motion.div key={b.t}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <b.icon className="text-primary mb-3" size={22} />
            <h3 className="font-display font-semibold text-foreground mb-2">{b.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Join the journey.</h2>
        <p className="text-muted-foreground mb-8">Let's reimagine support together.</p>
        <Link to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
          style={{ boxShadow: "0 0 30px oklch(0.82 0.18 215 / 0.3)" }}>
          Get in touch <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
