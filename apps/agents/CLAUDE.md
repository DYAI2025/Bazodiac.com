# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AstroAgents Select is a React TypeScript application that provides an interface for selecting and interacting with AI voice agents via ElevenLabs' Convai widget. Users select an agent from a card grid, which opens a modal with the ElevenLabs voice interface.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
npm run deploy:github  # Deploy to GitHub Pages
npm run deploy:vercel  # Deploy to Vercel
```

## Architecture

### Data Flow
1. `constants.ts` defines `AGENTS` array with agent metadata and ElevenLabs agent IDs
2. `App.tsx` renders agent grid using `AGENTS`, manages selected agent state
3. `AgentCard` displays agent info, clicking triggers selection
4. `AgentModal` opens with selected agent, loads ElevenLabs widget using `useConvaiScript` hook

### Key Files
- `types.ts` - `Agent` interface defining agent structure (id, name, elevenlabsAgentId, etc.)
- `constants.ts` - Agent data and `CONVAI_SCRIPT_URL` for ElevenLabs widget
- `hooks/useConvaiScript.ts` - Manages ElevenLabs script loading, provides `loaded`/`error` state
- `vite.config.ts` - Injects API keys via `process.env.*` defines

### Styling
- Tailwind CSS via CDN (configured in `index.html`)
- Custom color themes: ivory (light), navy (dark), gold accents
- Dark mode toggled via class on root element

### Environment Variables
```
GEMINI_API_KEY      # Required for Gemini API
ELEVENLABS_API_KEY  # Required for voice agents
```

Set in `.env.local` for development. For production, set in GitHub Secrets or Vercel environment settings.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to main. Requires `GEMINI_API_KEY` in repository secrets.
