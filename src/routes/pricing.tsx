import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — Kyro AI" },
      { name: "description", content: "Simple, transparent pricing for Kyro AI. 12 USDT/month. 14-day free trial. No credit card required." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  highlight?: boolean;
  custom?: boolean;
};

const plans: Plan[] = [
  {
    name: "Pro",
    tagline: "Everything you need to automate your support",
    monthly: 12, yearly: 12, // yearly unused but keeping type shape
    features: ["Unlimited conversations", "Unlimited agents", "All integrations (WhatsApp, Slack, etc.)", "Priority support", "Advanced analytics & exports", "Unlimited data sources", "Lead capture & CRM sync", "Human handoff", "Custom branding"],
    cta: "Start Free Trial",
    highlight: true,
  }
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes — our plan starts with a 14-day free trial. No credit card required." },
  { q: "What counts as a conversation?", a: "A conversation is a unique chat session with one customer. Multiple messages in one session = one conversation." },
  { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time right from your dashboard." },
  { q: "How long does setup take?", a: "Most customers go live in under an hour. Upload your data, customize your agent, deploy." },
  { q: "Is my data secure?", a: "Yes. AES-256 encryption at rest, TLS in transit, and your data is never used to train external models." },
];

function Pricing() {

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Pricing</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter">
          Simple <span className="text-gradient-cyan glow-text">pricing.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          14-day free trial. Cancel anytime.
        </p>
      </motion.section>

      <div className="max-w-md mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative rounded-3xl p-8 glass border-primary/60`}
            style={{ boxShadow: "0 0 40px oklch(0.82 0.18 215 / 0.2)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
              <Sparkles size={11} /> All Access
            </div>
            
            <h3 className="font-display text-2xl font-semibold text-foreground text-center">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 text-center">{p.tagline}</p>

            <div className="mt-6 mb-6 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-semibold text-foreground">
                  12 USDT
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>

            <Link to="/contact"
              className="block text-center py-3 rounded-xl text-sm font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90">
              {p.cta}
            </Link>

            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <section className="mt-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-semibold text-center mb-10">
          Frequently asked questions
        </motion.h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group glass rounded-xl p-5 cursor-pointer"
            >
              <summary className="font-display font-semibold text-foreground list-none flex justify-between items-center">
                {f.q}
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>
    </div>
  );
}
