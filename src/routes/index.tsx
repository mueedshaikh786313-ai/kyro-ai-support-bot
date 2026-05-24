import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, Globe2, MessageSquare, ArrowRight, Check,
  Shield, BarChart3, Users, Brain, Plug, Rocket,
  ShoppingCart, Monitor, HeartPulse, GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { HeroOrb } from "@/components/HeroOrb";
import { HeroIntro } from "@/components/HeroIntro";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Kyro AI — Premium AI Customer Support for Your Business" },
      { name: "description", content: "Train an AI support agent on your business data in minutes. 24/7 support across WhatsApp, web, and social. See a free demo today." },
      { property: "og:title", content: "Kyro AI — Premium AI Customer Support" },
      { property: "og:description", content: "Train an AI support agent on your business data in minutes." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Stats />
      <UseCasesPreview />
      <FinalCTA />
    </>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Hero() {
  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden">
      <HeroIntro />

      {/* Cinematic atmosphere layers (hero-scoped) */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        {/* fog gradient */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 30%, oklch(0.18 0.08 220 / 0.55), transparent 55%), radial-gradient(ellipse at 20% 80%, oklch(0.15 0.06 240 / 0.45), transparent 60%)" }} />
        {/* vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0 0 0 / 0.7) 100%)" }} />
        {/* animated blur orb */}
        <motion.div
          className="absolute -right-40 top-20 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.82 0.18 215 / 0.18), transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative text-center lg:text-left">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-medium text-primary mb-7 tracking-wider uppercase">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              Next-Gen AI Platform
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold tracking-[-0.04em] text-foreground leading-[0.98]"
            >
              AI Support That <br />
              <span className="text-gradient-cyan glow-text">Understands Your</span><br />
              <span className="text-gradient-cyan glow-text">Business.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Intelligent conversations, real-time automation, and immersive customer experiences powered by next-generation AI.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ boxShadow: "0 0 40px oklch(0.82 0.18 215 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.25)" }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(120deg, transparent 30%, oklch(1 0 0 / 0.3) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s ease-in-out infinite" }} />
                <Rocket size={16} className="relative" />
                <span className="relative">Launch Experience</span>
                <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-foreground font-semibold text-sm hover:border-primary/50 transition-all hover:bg-primary/5"
              >
                Explore Platform
                <ArrowRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-[11px] uppercase tracking-widest text-muted-foreground/80">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> SOC 2 Ready</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> 50+ Languages</span>
              <span className="hidden sm:flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> 24/7 Live</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroOrb />
            {/* caption under orb */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-6 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70"
            >
              Kyro Core · v1.0
            </motion.p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </section>
  );
}


function LogoCloud() {
  const logos = ["TechCorp", "Nova", "Atlas", "Vertex", "Lumen", "Forge"];
  return (
    <section className="py-12 border-y border-border/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by forward-thinking teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
          {logos.map((l) => (
            <span key={l} className="font-display text-xl text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const featuresData = [
  { icon: Brain, title: "Trained on your data", desc: "Upload PDFs, FAQs, docs, or a website URL. Kyro learns in minutes." },
  { icon: Zap, title: "Instant responses", desc: "Sub-second replies powered by state-of-the-art LLMs and RAG." },
  { icon: Globe2, title: "50+ languages", desc: "Speak to customers in their language, automatically." },
  { icon: Plug, title: "Connect anywhere", desc: "WhatsApp, Slack, Instagram, Shopify, WordPress, REST API." },
  { icon: Shield, title: "Enterprise security", desc: "Encrypted at rest. SOC 2 ready. Your data never trains public models." },
  { icon: BarChart3, title: "Real analytics", desc: "See what customers ask, where bots get stuck, and improve over time." },
];

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-32">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Features</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
          Everything you need to <br /> automate support beautifully.
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresData.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="text-primary" size={20} />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload your knowledge", d: "Drop PDFs, paste a URL, or sync your help center. Kyro indexes everything." },
    { n: "02", t: "Customize your agent", d: "Tone, name, branding, escalation rules — built in minutes, no code." },
    { n: "03", t: "Deploy everywhere", d: "Embed on your site or connect WhatsApp, Slack, Instagram in one click." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-primary mb-3">How it works</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
          Live in under 10 minutes.
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div key={s.n} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <div className="font-display text-5xl font-bold text-gradient-cyan mb-4">{s.n}</div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "80%", l: "Fewer support tickets" },
    { n: "<2s", l: "Average response time" },
    { n: "24/7", l: "Always available" },
    { n: "50+", l: "Languages supported" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="glass rounded-3xl p-10 sm:p-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30"
          style={{ background: "radial-gradient(circle at 30% 50%, oklch(0.82 0.18 215 / 0.25), transparent 60%)" }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.l} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
              <p className="font-display text-4xl sm:text-5xl font-bold text-gradient-cyan glow-text">{s.n}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wider">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesPreview() {
  const cases: { icon: LucideIcon; title: string; d: string }[] = [
    { icon: ShoppingCart, title: "E-commerce", d: "Orders, returns, recommendations" },
    { icon: Monitor, title: "SaaS", d: "Onboarding, billing, technical FAQs" },
    { icon: HeartPulse, title: "Healthcare", d: "Appointments, insurance queries" },
    { icon: GraduationCap, title: "Education", d: "Admissions, course info, student help" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
      <motion.div {...fadeUp} className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Use Cases</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
          Built for every industry.
        </h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((c, i) => (
          <motion.div key={c.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass rounded-2xl p-6 hover:border-primary/40 transition-all">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <c.icon className="text-primary" size={22} />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-xs text-muted-foreground">{c.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/use-cases" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          Explore all use cases <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-32 text-center">
      <motion.div {...fadeUp}>
        <h2 className="font-display text-5xl sm:text-6xl font-semibold tracking-tighter">
          Ready to <span className="text-gradient-cyan glow-text">transform support?</span>
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Join hundreds of businesses cutting response times and delighting customers with Kyro.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
            style={{ boxShadow: "0 0 30px oklch(0.82 0.18 215 / 0.3)" }}>
            See Demo <ArrowRight size={16} />
          </Link>
          <Link to="/pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-foreground font-semibold text-sm">
            See Pricing
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
