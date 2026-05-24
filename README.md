# KYRO AI — Premium AI Customer Support Website

Cinematic, futuristic marketing site + live AI chat demo for **Kyro AI**.

## ✨ Stack
- **TanStack Start** (React 19 + Vite 7) — file-based routing, SSR
- **Tailwind CSS v4** — `src/styles.css` with OKLCH design tokens
- **Framer Motion** — cinematic animations (hero orb, intro, transitions)
- **Supabase (Lovable Cloud)** — `leads` table + RLS for contact form
- **Lovable AI Gateway** — `google/gemini-3-flash-preview` streaming chat
- **AI SDK** (`ai`, `@ai-sdk/react`) + `react-markdown`

## 📁 Structure
```
src/
  assets/kyro-logo.png
  components/
    BackgroundFX.tsx       # animated grid + ambient orbs
    ChatWidget.tsx         # floating live AI chat
    Footer.tsx
    HeroIntro.tsx          # cinematic boot sequence
    HeroOrb.tsx            # 3D AI core orb (CSS/SVG + motion)
    Logo.tsx
    Navbar.tsx             # sticky glassmorphic nav
    ui/                    # shadcn components
  integrations/supabase/   # auto-generated clients (do not edit)
  routes/
    __root.tsx             # layout + SEO
    index.tsx              # Home (hero + demo)
    features.tsx
    use-cases.tsx
    integrations.tsx
    pricing.tsx
    about.tsx
    contact.tsx
    api/chat.ts            # streaming AI route
  styles.css               # design tokens (Midnight Cyan Glow)
supabase/
  config.toml
  migrations/              # leads table + RLS
```

## 🚀 Setup
```bash
bun install
bun run dev
```

### Environment (`.env`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
# Server-only (set in Lovable Cloud / deployment env):
SUPABASE_SERVICE_ROLE_KEY=...
LOVABLE_API_KEY=...           # for AI Gateway
```

## 🎨 Design — Midnight Cyan Glow
- Pure black `#000` → deep navy `#0a1628` → electric cyan `#22d3ee`
- Display: **Space Grotesk** · Body: **Inter**
- Glassmorphism cards, gradient borders, animated grid bg, glowing CTAs

## 🧠 AI Chat
Streaming endpoint: `POST /api/chat` → Lovable AI Gateway (`google/gemini-3-flash-preview`).
Floating widget in `ChatWidget.tsx` with suggested prompts + markdown rendering.

## 📩 Leads
Contact form inserts into `public.leads` (RLS: public INSERT, authenticated SELECT).

## 🏗 Build
```bash
bun run build       # production build (Cloudflare Workers target)
```

## 📜 License
Proprietary — Kyro AI © 2026
