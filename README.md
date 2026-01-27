# Bazodiac Unified Platform

> Immersive Astro-/Identity-Plattform mit BaZi + Astrologie Datenkern

## 🏗️ Architektur

```
bazodiac-unified/
├── apps/
│   ├── marketing/          # Landing Page (GSAP + Tailwind CDN)
│   │   ├── index.html      # Landing Page mit Effekten
│   │   ├── styles.css
│   │   └── scripts.js
│   │
│   ├── onboarding/         # MVP Onboarding Flow
│   │   ├── src/            # React 19 Frontend
│   │   ├── server/         # Express Backend
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   │
│   └── agents/             # Agent Selection Interface
│       ├── App.tsx
│       ├── components/
│       ├── hooks/
│       └── ...
│
├── packages/               # Shared Code
│   ├── ui/                 # Shared UI Components
│   ├── services/           # Shared Services
│   └── config/             # Shared Configuration
│
├── supabase/               # Database
│   ├── schema.sql          # Tables & Relationships
│   └── migrations/
│
└── docs/                   # Documentation
    ├── architecture.md
    └── user-flow.md
```

## 🚀 Quick Start

### Alle Apps entwickeln
```bash
npm run dev:marketing  # Port 3000 (Landing Page)
npm run dev:onboarding # Port 3001 (Onboarding)
npm run dev:agents     # Port 3002 (Agents)
```

### Produktion bauen
```bash
npm run build:all
```

## 📦 Apps

### Marketing (Landing Page)
- **Pfad:** `apps/marketing/`
- **Tech:** HTML + JS + GSAP + Tailwind CDN
- **Features:**
  - Intro Video
  - GSAP Animationen (Nebel, Synthese Core)
  - Audio Controls
  - Multi-language (EN/DE)

### Onboarding (MVP)
- **Pfad:** `apps/onboarding/`
- **Tech:** React 19 + Vite + Express + Supabase
- **Features:**
  - Birth Data Input
  - BaZi/Astrology Analysis
  - Symbol Generation (BaziEngine + Gemini Fallback)
  - Agent Selection
  - Character Dashboard

### Agents (Voice Interface)
- **Pfad:** `apps/agents/`
- **Tech:** React + ElevenLabs Convai Widget
- **Features:**
  - Agent Grid Selection
  - ElevenLabs Voice Agents (Levi, Victoria)
  - Conversation Persistence

## 🗄️ Supabase Schema

| Tabelle | Beschreibung |
|---------|-------------|
| `profiles` | User State & Preferences |
| `charts` | Astrological Analyses |
| `sessions` | Agent Conversations |
| `user_horoscope_cache` | Cached Horoscope Data |

Siehe: `supabase/schema.sql`

## 🔧 Konfiguration

Umgebungsvariablen in `.env`:
```bash
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
SUPABASE_ANON_KEY=xxx

# ElevenLabs
ELEVENLABS_API_KEY=sk_xxx
VITE_ELEVENLABS_AGENT_ID_LEVI=agent_xxx
VITE_ELEVENLABS_AGENT_ID_VICTORIA=agent_xxx

# Gemini
GEMINI_API_KEY=AIzaSyxxx

# BaziEngine
BAZI_ENGINE_URL=https://baziengine-v2.fly.dev
```

## 🎯 User Flow

```
1. Landing Page → "Initiate Singularity"
2. Onboarding:
   - Birth Data Input
   - Analysis (BaZi + Astrology)
   - Symbol Generation
3. Agent Selection → Levi oder Victoria
4. Character Dashboard:
   - Horoscope Display
   - Agent Conversation
   - Quizzes (später)
5. Singularities (später)
```

## 📚 Dokumentation

- `docs/architecture.md` - Detaillierte Architektur
- `docs/user-flow.md` - User Journey Details

## 🔗 Repositories (Legacy)

Vor dem Merge:
- `DYAI2025/bazodiac-website` → jetzt `apps/marketing/`
- `DYAI2025/bazodiac-mvp` → jetzt `apps/onboarding/`
- `DYAI2025/Celestia-agents` → jetzt `apps/agents/`
- `DYAI2025/BaZiEngine_v2` → Remote Service

## 📄 Lizenz

MIT
