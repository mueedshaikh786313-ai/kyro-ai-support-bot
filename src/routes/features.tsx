import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain, Zap, Globe2, Plug, Shield, BarChart3, MessageCircle,
  Users, Sparkles, Bot, FileText, Database, Languages, GitBranch, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: "Features — Kyro AI" },
      { name: "description", content: "Discover every Kyro AI feature: training on your data, real-time analytics, omnichannel deployment, multilingual support, and more." },
      { property: "og:title", content: "Features — Kyro AI" },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
});

const allFeatures = [
  { icon: Brain, title: "Train on your data", desc: "Upload PDFs, websites, FAQs, docs, or knowledge base. Kyro indexes everything with vector search for accurate retrieval." },
  { icon: Zap, title: "Real-time streaming", desc: "Sub-second responses with token streaming. Customers see answers form in real time, like a human typing." },
  { icon: Globe2, title: "50+ languages", desc: "Auto-detect customer language and reply natively. Built-in translation for every major market." },
  { icon: Plug, title: "Omnichannel deploy", desc: "Web widget, WhatsApp, Instagram, Messenger, Slack, Telegram, REST API — one bot, every channel." },
  { icon: Shield, title: "Enterprise-grade security", desc: "AES-256 encryption at rest, TLS in transit, SOC 2 ready. Your data is yours — never used to train external models." },
  { icon: BarChart3, title: "Conversation analytics", desc: "Track resolution rate, CSAT, top questions, knowledge gaps. Export to your BI tools via API." },
  { icon: MessageCircle, title: "Smart human handoff", desc: "Define escalation rules. When the bot can't help, route seamlessly to a human with full context." },
  { icon: Users, title: "Lead capture built-in", desc: "Configure forms inline. Kyro qualifies prospects mid-conversation and syncs to your CRM." },
  { icon: Bot, title: "Custom personas", desc: "Match your brand voice — friendly, formal, witty. Custom name, avatar, opening line, fallback messages." },
  { icon: FileText, title: "Source citations", desc: "Every answer links to the source doc. Build trust and let customers verify information." },
  { icon: Database, title: "Live data sources", desc: "Connect to APIs for order status, account info, real-time inventory. Bot answers stay accurate." },
  { icon: Languages, title: "Voice & WhatsApp", desc: "Voice-to-text on WhatsApp calls. Send images, documents, and rich cards in chat." },
  { icon: GitBranch, title: "A/B test prompts", desc: "Test different personas, opening messages, and flows. Optimize with data, not guesses." },
  { icon: Sparkles, title: "Continuous learning", desc: "Mark answers as good/bad. Kyro improves from feedback automatically — no retraining cycles." },
];

function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center py-16"
      >
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Features</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter">
          Powerful, <span className="text-gradient-cyan glow-text">by design.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Every feature crafted to make your support team superhuman.
        </p>
      </motion.section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allFeatures.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="text-primary" size={20} />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <Link to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
          style={{ boxShadow: "0 0 30px oklch(0.82 0.18 215 / 0.3)" }}>
          See a Demo <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
