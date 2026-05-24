import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, ShoppingBag, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

const DEFAULT_SUGGESTIONS = [
  "What can Kyro do for my business?",
  "How does pricing work?",
  "Which integrations are supported?",
  "How long does setup take?",
];

const LUXE_SUGGESTIONS = [
  "For wedding which shirt i choose??",
  "What fits and sizes are available?",
  "Track my wedding order #10243",
  "Do you provide free custom alterations?",
];

const CUSTOM_SUGGESTIONS = [
  "What services does this site offer?",
  "What is the main topic of this page?",
  "Summarize the crawled information.",
];

interface ChatWidgetProps {
  activeBot?: "kyro" | "luxe" | "custom";
  customSiteName?: string;
  customSiteUrl?: string;
  className?: string;
}

export function ChatWidget({
  activeBot = "kyro",
  customSiteName = "Custom Website",
  customSiteUrl,
  className,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Hide global floating button on the sandbox page to avoid double widgets
  const isGlobal = !className;
  const isSandboxPage = typeof window !== "undefined" && window.location.pathname === "/sandbox";
  if (isGlobal && isSandboxPage) {
    return null;
  }

  const { messages, sendMessage, status } = useChat({
    id: activeBot,
    transport: chatTransport,
    body: {
      activeBot,
    },
  });

  const isLoading = status === "submitted" || status === "streaming";
 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);
 
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages.length, status]);
 
  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");
    await sendMessage({ text: content });
  };
 
  const isLuxe = activeBot === "luxe";
  const isCustom = activeBot === "custom";
 
  // Configuration settings based on active agent role
  const botName = isLuxe ? "Luxe Concierge" : isCustom ? `${customSiteName} AI` : "Kyro";
  const botSubtitle = isLuxe ? "Luxury Fashion Advisor" : isCustom ? "Page Analysis Assistant" : "AI Support";
  const suggestions = isLuxe ? LUXE_SUGGESTIONS : isCustom ? CUSTOM_SUGGESTIONS : DEFAULT_SUGGESTIONS;
 
  // Theming classes
  const themeBg = isLuxe ? "bg-[#c5a85c]" : isCustom ? "bg-violet-600" : "bg-primary";
  const themeText = isLuxe ? "text-[#c5a85c]" : isCustom ? "text-violet-400" : "text-primary";
  const themeBorder = isLuxe 
    ? "border-[#c5a85c]/30 hover:border-[#c5a85c]/80 hover:bg-[#c5a85c]/5" 
    : isCustom 
    ? "border-violet-500/20 hover:border-violet-500/60 hover:bg-violet-600/5" 
    : "border-border/60 hover:border-primary/60 hover:bg-primary/5";
  const themeFocusBorder = isLuxe ? "focus-within:border-[#c5a85c]/60" : isCustom ? "focus-within:border-violet-500/60" : "focus-within:border-primary/60";
  const fontClass = isLuxe ? "font-serif" : "font-display";
 
  const welcomeHeader = isLuxe ? "Welcome to Luxe Attire 🛍️" : isCustom ? `Chat with ${customSiteName} 🌐` : "Hi, I'm Kyro 👋";
  const welcomeSubtitle = isLuxe
    ? "Bespoke styling support for formal and wedding events. Ask me about fits, premium satin silk or cotton fabrics, sizes, alterations, or shipping."
    : isCustom
    ? `Kyro has crawled this page successfully! Ask me anything about the content or products found on this website.`
    : "Ask me anything about how AI can transform your customer support.";
 
  // Button glow shadows matching themes
  const buttonShadow = isLuxe
    ? "0 0 35px rgba(197, 168, 92, 0.4), 0 8px 24px rgba(0, 0, 0, 0.6)"
    : isCustom
    ? "0 0 35px rgba(124, 58, 237, 0.4), 0 8px 24px rgba(0, 0, 0, 0.6)"
    : "0 0 30px oklch(0.82 0.18 215 / 0.5), 0 8px 24px oklch(0.05 0.01 240 / 0.6)";
 
  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={cn("fixed bottom-6 left-6 z-[60] w-14 h-14 rounded-2xl flex items-center justify-center group cursor-pointer", themeBg, className)}
        style={{ boxShadow: buttonShadow }}
        aria-label={`Open ${botName} chat`}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="text-primary-foreground" size={22} />
            </motion.div>
          ) : (
            <motion.div key="logo" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              {isLuxe ? (
                <ShoppingBag className="text-primary-foreground" size={24} />
              ) : isCustom ? (
                <Bot className="text-primary-foreground" size={24} />
              ) : (
                <LogoMark size={28} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
 
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className={cn(
              "fixed bottom-24 left-4 sm:left-6 z-[55] w-[calc(100vw-2rem)] sm:w-[380px] h-[820px] max-h-[calc(100vh-5rem)] flex flex-col rounded-[28px] bg-neutral-950/80 backdrop-blur-2xl border border-neutral-800/80 overflow-hidden",
              isLuxe && "border-[#c5a85c]/25",
              isCustom && "border-violet-500/25"
            )}
            style={{ 
              boxShadow: isLuxe 
                ? "0 20px 60px oklch(0 0 0 / 0.95), 0 0 40px rgba(197, 168, 92, 0.08)"
                : isCustom
                ? "0 20px 60px oklch(0 0 0 / 0.95), 0 0 40px rgba(124, 58, 237, 0.08)"
                : "0 20px 60px oklch(0 0 0 / 0.9), 0 0 40px oklch(0.82 0.18 215 / 0.1)" 
            }}
          >
            {/* Header */}
            <div className={cn(
              "flex items-center gap-3 px-6 py-4.5 border-b border-border/40 bg-linear-to-b from-neutral-900/40 to-transparent backdrop-blur-md", 
              isLuxe && "border-[#c5a85c]/10", 
              isCustom && "border-violet-500/10"
            )}>
              <div className="relative flex items-center justify-center w-10 h-10">
                {/* Bubble Orbit & Ripple Animations around Kyro logo during reply/loading */}
                {isLoading && !isLuxe && !isCustom && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ripple-ring pointer-events-none" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bubble-1 shadow-[0_0_8px_#22d3ee] pointer-events-none" />
                    <div className="absolute w-1.2 h-1.2 rounded-full bg-sky-300 animate-bubble-2 shadow-[0_0_6px_#7dd3fc] pointer-events-none" />
                    <div className="absolute w-1 h-1 rounded-full bg-cyan-600 animate-bubble-3 shadow-[0_0_4px_#0891b2] pointer-events-none" />
                  </>
                )}
                
                <div className="relative z-10">
                  {isLuxe ? (
                    <div className="w-8 h-8 rounded-xl bg-[#c5a85c]/10 border border-[#c5a85c]/35 flex items-center justify-center">
                      <ShoppingBag className="text-[#c5a85c]" size={16} />
                    </div>
                  ) : isCustom ? (
                    <div className="w-8 h-8 rounded-xl bg-violet-600/10 border border-violet-500/35 flex items-center justify-center">
                      <Bot className="text-violet-400" size={16} />
                    </div>
                  ) : (
                    <LogoMark size={32} />
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-950 animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={cn("font-semibold text-sm text-foreground tracking-tight", fontClass)}>{botName}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Sparkles size={10} className={themeText} /> {botSubtitle} · Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-6 my-auto flex flex-col justify-center min-h-[400px]">
                  <div className="text-center py-4">
                    <div className="inline-block mb-4">
                      {isLuxe ? (
                        <div className="w-14 h-14 rounded-2xl bg-[#c5a85c]/10 border border-[#c5a85c]/30 flex items-center justify-center mx-auto">
                          <ShoppingBag className="text-[#c5a85c]" size={28} />
                        </div>
                      ) : isCustom ? (
                        <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center mx-auto">
                          <Bot className="text-violet-400" size={28} />
                        </div>
                      ) : (
                        <LogoMark size={48} />
                      )}
                    </div>
                    <h4 className={cn("font-semibold text-foreground text-xl tracking-tight", fontClass)}>{welcomeHeader}</h4>
                    <p className="text-xs text-muted-foreground mt-2 px-6 leading-relaxed max-w-sm mx-auto">
                      {welcomeSubtitle}
                    </p>
                  </div>
                  <div className="space-y-2 max-w-md mx-auto w-full">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className={cn(
                          "w-full text-left px-4 py-3 text-xs rounded-2xl border transition-all text-muted-foreground hover:text-foreground cursor-pointer font-medium",
                          themeBorder
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = typeof (m as any).content === "string"
                  ? (m as any).content
                  : m.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") || "";
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={cn("flex gap-3.5", isUser && "justify-end")}>
                    {!isUser && (
                      <div className="flex-shrink-0 mt-1">
                        {isLuxe ? (
                          <div className="w-6 h-6 rounded-lg bg-[#c5a85c]/15 border border-[#c5a85c]/25 flex items-center justify-center">
                            <ShoppingBag className="text-[#c5a85c]" size={12} />
                          </div>
                        ) : isCustom ? (
                          <div className="w-6 h-6 rounded-lg bg-violet-600/15 border border-violet-500/25 flex items-center justify-center">
                            <Bot className="text-violet-400" size={12} />
                          </div>
                        ) : (
                          <LogoMark size={22} />
                        )}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] text-sm leading-relaxed",
                        isUser
                          ? cn("px-4.5 py-3 rounded-[20px] rounded-br-md text-primary-foreground font-medium shadow-md shadow-primary/5", themeBg)
                          : "text-foreground prose-cyan"
                      )}
                    >
                      {isUser ? (
                        text
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2.5 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1.5 my-2.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1.5 my-2.5">{children}</ol>,
                            strong: ({ children }) => <strong className={cn("font-semibold", themeText)}>{children}</strong>,
                            a: ({ children, href }) => <a href={href} className={cn("underline", themeText)}>{children}</a>,
                          }}
                        >
                          {text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex gap-3.5 items-center">
                  <div className="flex-shrink-0 relative flex items-center justify-center w-8 h-8">
                    {/* Animated bubble loader for Kyro */}
                    {!isLuxe && !isCustom && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ripple-ring pointer-events-none" />
                        <div className="absolute w-1 h-1 rounded-full bg-cyan-400 animate-bubble-1 shadow-[0_0_6px_#22d3ee] pointer-events-none" />
                        <div className="absolute w-1 h-1 rounded-full bg-sky-300 animate-bubble-2 shadow-[0_0_4px_#7dd3fc] pointer-events-none" />
                      </>
                    )}
                    <div className="relative z-10">
                      {isLuxe ? (
                        <div className="w-6 h-6 rounded-lg bg-[#c5a85c]/15 flex items-center justify-center">
                          <ShoppingBag className="text-[#c5a85c]" size={12} />
                        </div>
                      ) : isCustom ? (
                        <div className="w-6 h-6 rounded-lg bg-violet-600/15 flex items-center justify-center">
                          <Bot className="text-violet-400" size={12} />
                        </div>
                      ) : (
                        <LogoMark size={22} />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1.5 px-4 py-3 rounded-[20px] rounded-bl-md bg-neutral-900/60 border border-neutral-800/40 backdrop-blur-xs">
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", themeBg)} style={{ animationDelay: "0ms" }} />
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", themeBg)} style={{ animationDelay: "150ms" }} />
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", themeBg)} style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className={cn("p-3 border-t border-border/40", isLuxe && "border-[#c5a85c]/10", isCustom && "border-violet-500/10")}
            >
              <div className={cn("flex items-end gap-2 rounded-2xl border border-border bg-input/40 transition-colors p-2", themeFocusBorder)}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Ask ${botName} anything…`}
                  rows={1}
                  className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground outline-none px-2 py-1.5 max-h-32"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "flex-shrink-0 w-9 h-9 rounded-xl text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all cursor-pointer",
                    themeBg
                  )}
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
                Powered by Kyro AI · Live Dynamic Agent
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
