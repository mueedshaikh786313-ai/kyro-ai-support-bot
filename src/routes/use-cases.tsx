import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, ShoppingCart, Monitor, HeartPulse,
  Home, GraduationCap, Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
  head: () => ({
    meta: [
      { title: "Use Cases — Kyro AI" },
      { name: "description", content: "See how Kyro AI powers customer support for e-commerce, SaaS, healthcare, real estate, and education businesses." },
      { property: "og:url", content: "/use-cases" },
    ],
    links: [{ rel: "canonical", href: "/use-cases" }],
  }),
});

const cases: { icon: LucideIcon; title: string; color: string; examples: string[]; desc: string }[] = [
  { icon: ShoppingCart, title: "E-commerce", color: "from-cyan-400/20 to-blue-500/20",
    examples: ["Order status & tracking", "Returns & refunds", "Product recommendations", "Size & spec questions", "Discount eligibility"],
    desc: "Cut ticket volume by 70% while increasing AOV with smart product suggestions." },
  { icon: Monitor, title: "SaaS", color: "from-purple-400/20 to-cyan-500/20",
    examples: ["Onboarding & setup help", "Feature explanations", "Billing & subscription", "Bug triage", "API documentation Q&A"],
    desc: "Onboard users faster and reduce churn with always-available product help." },
  { icon: HeartPulse, title: "Healthcare", color: "from-emerald-400/20 to-cyan-500/20",
    examples: ["Appointment booking FAQs", "Insurance verification", "Pre-visit preparation", "Prescription refill info", "Clinic hours & directions"],
    desc: "Free up front desk staff while giving patients 24/7 answers." },
  { icon: Home, title: "Real Estate", color: "from-amber-400/20 to-cyan-500/20",
    examples: ["Property availability", "Pricing & EMI calculation", "Visit scheduling", "Location & amenities", "Document requirements"],
    desc: "Qualify leads instantly and book site visits without missing a single inquiry." },
  { icon: GraduationCap, title: "Education", color: "from-pink-400/20 to-cyan-500/20",
    examples: ["Admission procedures", "Course curriculum", "Fee structure", "Scholarship info", "Faculty & placement"],
    desc: "Answer thousands of prospective student questions during peak admission season." },
  { icon: Landmark, title: "Financial Services", color: "from-violet-400/20 to-cyan-500/20",
    examples: ["Account inquiries", "Loan eligibility", "Document collection", "Branch locator", "Investment FAQs"],
    desc: "Compliant, accurate answers across loans, insurance, and banking." },
];

function UseCases() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Use Cases</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter">
          One bot. <span className="text-gradient-cyan glow-text">Every industry.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Kyro adapts to your domain — trained on your exact business data and workflows.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-primary/40 transition-all"
          >
            <div className={`absolute inset-0 -z-10 opacity-40 bg-gradient-to-br ${c.color}`} />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <c.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{c.title}</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{c.desc}</p>
            <ul className="space-y-2">
              {c.examples.map((ex) => (
                <li key={ex} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span> {ex}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <p className="text-muted-foreground mb-6">Don't see your industry?</p>
        <Link to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
          style={{ boxShadow: "0 0 30px oklch(0.82 0.18 215 / 0.3)" }}>
          Talk to us <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
