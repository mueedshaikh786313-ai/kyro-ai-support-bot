import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  component: Integrations,
  head: () => ({
    meta: [
      { title: "Integrations — Kyro AI" },
      { name: "description", content: "Kyro AI connects with WhatsApp, Slack, Shopify, WordPress, Zapier, and 50+ tools you already use." },
      { property: "og:url", content: "/integrations" },
    ],
    links: [{ rel: "canonical", href: "/integrations" }],
  }),
});

const integrations = [
  { name: "WhatsApp", cat: "Messaging", emoji: "💬" },
  { name: "Slack", cat: "Messaging", emoji: "💼" },
  { name: "Instagram", cat: "Social", emoji: "📷" },
  { name: "Messenger", cat: "Social", emoji: "💬" },
  { name: "Telegram", cat: "Messaging", emoji: "✈️" },
  { name: "Shopify", cat: "E-commerce", emoji: "🛍️" },
  { name: "WooCommerce", cat: "E-commerce", emoji: "🛒" },
  { name: "WordPress", cat: "CMS", emoji: "📝" },
  { name: "Webflow", cat: "Web", emoji: "🌐" },
  { name: "Zapier", cat: "Automation", emoji: "⚡" },
  { name: "HubSpot", cat: "CRM", emoji: "🎯" },
  { name: "Salesforce", cat: "CRM", emoji: "☁️" },
  { name: "Zendesk", cat: "Support", emoji: "🎧" },
  { name: "Freshdesk", cat: "Support", emoji: "🎫" },
  { name: "Notion", cat: "Docs", emoji: "📓" },
  { name: "Google Sheets", cat: "Data", emoji: "📊" },
  { name: "Stripe", cat: "Payments", emoji: "💳" },
  { name: "Calendly", cat: "Scheduling", emoji: "📅" },
  { name: "REST API", cat: "Custom", emoji: "🔌" },
  { name: "Webhooks", cat: "Custom", emoji: "🪝" },
];

function Integrations() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Integrations</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter">
          Plays nicely with <br /><span className="text-gradient-cyan glow-text">your stack.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect Kyro to the tools you already use. One-click setup for popular platforms, REST API for everything else.
        </p>
      </motion.section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {integrations.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 10) * 0.04 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 text-center hover:border-primary/40 transition-all cursor-pointer"
          >
            <div className="text-3xl mb-2">{it.emoji}</div>
            <p className="font-display font-semibold text-sm text-foreground">{it.name}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{it.cat}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-20 glass rounded-3xl p-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-foreground mb-3">Need a custom integration?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Our REST API and webhooks let you connect Kyro to any system in your stack. Enterprise customers get custom integration support.
        </p>
        <Link to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
          style={{ boxShadow: "0 0 30px oklch(0.82 0.18 215 / 0.3)" }}>
          Talk to our team <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
