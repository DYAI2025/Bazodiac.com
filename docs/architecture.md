# Bazodiac Unified Platform - Architecture Document

> Last Updated: 2026-01-27
> Version: 1.0.0

## 🎯 Overview

Bazodiac is an immersive astrology/identity platform that combines:
- **BaZi** (Chinese Four Pillars of Time)
- **Western Astrology**
- **AI Voice Agents** (Levi & Victoria)
- **Gamified User Experience**

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BAZODIAC UNIFIED PLATFORM                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     FRONTEND LAYER                           │   │
│  │                                                              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │   │
│  │  │  MARKETING  │  │ ONBOARDING  │  │   AGENTS    │          │   │
│  │  │  (GSAP/JS)  │  │  (React)    │  │  (React)    │          │   │
│  │  │             │  │             │  │             │          │   │
│  │  │ Landing     │  │ Birth Data  │  │ Agent Grid  │          │   │
│  │  │ Intro       │  │ Analysis    │  │ Voice Chat  │          │   │
│  │  │ Effects     │  │ Dashboard   │  │             │          │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   SHARED PACKAGES                            │   │
│  │                                                              │   │
│  │  @bazodiac/config     Shared Configuration                  │   │
│  │  @bazodiac/services   Supabase, API Services                │   │
│  │  @bazodiac/ui        Shared UI Components (TODO)           │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    BACKEND LAYER                             │   │
│  │                                                              │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │               Express Proxy Server                  │    │   │
│  │  │                                                    │    │   │
│  │  │  /api/symbol    → Gemini API (key protected)      │    │   │
│  │  │  /api/analysis → BaziEngine (external)            │    │   │
│  │  │  /api/transits → BaziEngine (external)            │    │   │
│  │  │  /api/agent-session → ElevenLabs Webhooks         │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    EXTERNAL SERVICES                        │   │
│  │                                                              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │   │
│  │  │  BaziEngine │  │  Gemini API │  │ElevenLabs   │          │   │
│  │  │  (Fly.io)   │  │  (Google)   │  │  (Voice)    │          │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    SUPABASE (Akasha Vault)                  │   │
│  │                                                              │   │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │   │
│  │  │  profiles │ │birth_data │ │  charts   │ │sessions   │   │   │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘   │   │
│  │                                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
bazodiac-unified/
├── apps/
│   ├── marketing/                 # Landing Page (GSAP + Tailwind CDN)
│   │   ├── index.html            # Landing page entry
│   │   ├── styles.css            # Custom styles + Tailwind
│   │   ├── scripts.js            # GSAP animations
│   │   └── assets/               # Video, audio, images
│   │
│   ├── onboarding/               # Main Onboarding Flow (React 19)
│   │   ├── src/
│   │   │   ├── components/       # React components
│   │   │   ├── services/         # Business logic
│   │   │   ├── contexts/         # React contexts
│   │   │   └── ...
│   │   ├── server/
│   │   │   ├── server.ts         # Express server
│   │   │   └── routes/           # API routes
│   │   └── ...
│   │
│   └── agents/                   # Agent Selection (React)
│       ├── src/
│       │   ├── components/       # Agent cards, modals
│       │   ├── hooks/            # useConvaiScript
│       │   └── ...
│       └── ...
│
├── packages/
│   ├── config/                   # Shared configuration
│   │   └── index.ts              # Environment config
│   │
│   ├── services/                 # Shared services
│   │   ├── index.ts              # Exports
│   │   ├── supabase.ts           # Supabase client + helpers
│   │   └── api.ts                # BaziEngine, Gemini, Fusion
│   │
│   └── ui/                       # Shared UI (TODO)
│       └── ...
│
├── supabase/
│   ├── schema.sql                # Database schema
│   ├── migrations/               # Migration files
│   └── types/                    # Generated TypeScript types
│
├── docs/
│   ├── architecture.md           # This file
│   └── user-flow.md              # User journey documentation
│
└── .env.example                  # Environment template
```

## 🔗 Data Flow

### 1. User Registration & Onboarding

```
User → Landing Page → "Initiate Singularity"
     → Birth Data Input (Name, Date, Time, Place)
     → Save to Supabase (birth_data table)
     → Call BaziEngine /api/analysis
     → Generate Symbol (BaziEngine or Gemini fallback)
     → Save to Supabase (charts table)
```

### 2. Agent Selection & Conversation

```
User → Select Agent (Levi or Victoria)
     → Create session in Supabase (agent_sessions table)
     → Load ElevenLabs Convai Widget
     → User speaks → ElevenLabs processes
     → Save messages to Supabase (agent_messages table)
     → Agent has full context (birth chart, previous conversations)
```

### 3. Character Dashboard

```
User → View Dashboard
     → Load chart from Supabase
     → Display astrological data
     → Show agent conversation history
     → (Future) Quiz results affect character stats
```

## 🗄️ Database Schema

### Core Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| `profiles` | User state & preferences | `id`, `language`, `is_premium`, `character_stats` |
| `birth_data` | Birth information | `id`, `birth_date`, `birth_time`, `birth_place` |
| `charts` | Calculated analyses | `id`, `analysis_json`, `symbol_svg`, `fusion_result` |
| `agent_sessions` | Agent conversations | `id`, `agent_id`, `is_active`, `messages_count` |
| `agent_messages` | Conversation history | `id`, `session_id`, `role`, `content` |
| `quiz_results` | Personality tests | `id`, `quiz_type`, `quiz_result`, `stat_changes` |

### Relationships

```
profiles (1) ──┬── (many) birth_data
              ├── (many) charts
              ├── (many) agent_sessions
              └── (many) quiz_results

birth_data (1) ──┬── (many) charts

charts (1) ──┬── (many) agent_sessions
            └── (many) quiz_results

agent_sessions (1) ──┬── (many) agent_messages
```

## 🔐 Security

### Environment Variables

Never commit `.env` files. Use `.env.example` as template.

### Sensitive Data

| Data | Storage | Protection |
|------|---------|------------|
| `GEMINI_API_KEY` | Backend only | Never exposed to frontend |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend only | Admin access |
| `ELEVENLABS_TOOL_SECRET` | Backend only | Webhook verification |
| `SESSION_SECRET` | Backend only | Session encryption |

### Frontend-Safe Keys

These can be safely exposed to the frontend:

| Key | Usage |
|-----|-------|
| `VITE_SUPABASE_URL` | Supabase client initialization |
| `VITE_SUPABASE_ANON_KEY` | Supabase client initialization |
| `VITE_ELEVENLABS_AGENT_ID_LEVI` | Agent widget config |
| `VITE_ELEVENLABS_AGENT_ID_VICTORIA` | Agent widget config |

## 🚀 Deployment

### Development

```bash
# Install all dependencies
npm run install:all

# Start all apps
npm run dev:all

# Or individually:
npm run dev:marketing  # http://localhost:3000
npm run dev:onboarding # http://localhost:3001
npm run dev:agents     # http://localhost:3002
```

### Production Build

```bash
# Build all apps
npm run build:all

# Or individually:
npm run build:marketing
npm run build:onboarding
npm run build:agents
```

### Environment

Set environment variables in your deployment platform:

- **Supabase keys** (required)
- **ElevenLabs keys** (required for voice agents)
- **Gemini API key** (required for symbol generation)
- **Session secret** (required)

## 📊 Performance Considerations

### Frontend

- Landing page loads GSAP/CSS immediately
- React apps use code-splitting via Vite
- Images optimized (WebP where supported)

### Backend

- BaziEngine calls have 8s timeout (with local fallback)
- Gemini proxy caches responses where possible
- Supabase queries optimized with indexes

### Database

- Indexed foreign keys for fast joins
- Row Level Security (RLS) policies
- Connection pooling via Supabase

## 🔄 Future Enhancements

### Phase 2 (Next)
- [ ] Quiz system integration
- [ ] Character stats gamification
- [ ] Social features (share charts)
- [ ] Payment integration (premium subscriptions)

### Phase 3
- [ ] 222 Singularities (advanced features)
- [ ] Social network features
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)

## 📝 Maintenance

### Regular Tasks

1. **Weekly**: Check Supabase for unused indexes
2. **Monthly**: Review and rotate API keys if needed
3. **Quarterly**: Audit RLS policies
4. **As needed**: Update dependencies

### Monitoring

- **Supabase Dashboard**: Database stats, RLS violations
- **Vercel/Railway**: Deployment logs, function errors
- **ElevenLabs**: Usage credits, agent performance

## 🤝 Contributing

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in values
3. Run `npm run install:all`
4. Run `npm run dev:all` to start development

### Code Style

- TypeScript strict mode enabled
- React functional components
- Tailwind CSS for styling
- Conventional commits

### Testing

```bash
# Run tests for onboarding app
cd apps/onboarding && npm test
```

## 📄 License

MIT License
