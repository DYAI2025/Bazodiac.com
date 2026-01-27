# Celestia - AI Studio App

## Project Overview

Celestia is a React-based application that allows users to interact with AI agents through voice conversations. The app provides a sophisticated UI with dark/light mode support, where users can select from different specialized AI agents and engage with them through the ElevenLabs Convai widget.

The application is built with React, TypeScript, Tailwind CSS for styling, and Vite as the build tool. It uses the ElevenLabs Convai widget for voice-based AI interactions and implements a modern glass-morphism UI design with smooth animations and transitions.

### Key Features

- **Multi-Agent Selection**: Users can choose from specialized AI agents with different capabilities
- **Voice Interaction**: Integration with ElevenLabs Convai for voice-based conversations
- **Dark/Light Mode**: Automatic theme detection with manual toggle capability
- **Responsive Design**: Fully responsive layout for all device sizes
- **Glass Morphism UI**: Modern glass-like UI elements with backdrop blur effects
- **Animation System**: Smooth transitions and animations throughout the interface

## Architecture

The application follows a component-based architecture with the following key components:

- **App.tsx**: Main application component that manages state and renders the layout
- **Layout.tsx**: Global layout with header, main content area, and footer
- **AgentCard.tsx**: Displays agent information and allows selection
- **AgentModal.tsx**: Modal interface for interacting with selected agents
- **useConvaiScript.ts**: Custom hook for loading the ElevenLabs Convai script
- **UI Components**: Reusable UI elements like Badge

## Building and Running

### Prerequisites

- Node.js

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key

3. Run the app in development mode:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev`: Starts the development server on port 3000
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the production build locally

## Configuration

### Environment Variables

- `GEMINI_API_KEY`: Required for the Gemini API integration

### Vite Configuration

The application uses Vite with the following configuration:
- Server runs on port 3000
- Hosted on 0.0.0.0 to allow external connections
- React plugin for JSX support
- Alias `@` pointing to the project root
- Environment variable injection for API keys

### Styling

- Tailwind CSS loaded via CDN with custom configuration
- Custom color palette including ivory (light mode) and navy (dark mode) themes
- Custom font: Inter (sans-serif) and Merriweather (serif)
- Custom animations and keyframes for smooth transitions
- Responsive grid layouts and design elements
- Glass-like UI elements with backdrop blur effects

## Key Dependencies

### Production Dependencies

- `react`: ^19.2.3
- `react-dom`: ^19.2.3
- `lucide-react`: ^0.562.0 (icon library)

### Development Dependencies

- `vite`: ^6.2.0 (build tool)
- `@vitejs/plugin-react`: ^5.0.0 (React plugin for Vite)
- `typescript`: ~5.8.2
- `@types/node`: ^22.14.0

## File Structure

```
/Users/benjaminpoersch/Projects/Celestia/
├── App.tsx                # Main application component
├── constants.ts           # Agent data and other constants
├── index.html             # HTML template with Tailwind and custom styles
├── index.tsx              # Main entry point that renders App
├── metadata.json          # App metadata
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
├── types.ts               # TypeScript type definitions
├── vite.config.ts         # Vite build configuration
├── components/            # React components
│   ├── AgentCard.tsx      # Agent selection card
│   ├── AgentModal.tsx     # Agent interaction modal
│   ├── Layout.tsx         # Main layout component
│   └── ui/                # UI components
│       └── Badge.tsx      # Badge component
└── hooks/                 # React hooks
    └── useConvaiScript.ts # Hook for ElevenLabs script loading
```

## Development Conventions

- Use TypeScript for type safety
- Follow React best practices with hooks
- Implement responsive design with Tailwind CSS
- Use semantic HTML and proper accessibility attributes
- Follow consistent naming conventions (PascalCase for components, camelCase for functions)
- Use relative imports with absolute path aliases when appropriate
- Implement proper error handling and loading states
- Maintain accessibility with proper ARIA attributes

## Special Considerations

- The ElevenLabs Convai script is loaded globally once at the app level
- The application uses a custom font system with Inter and Merriweather
- Custom scrollbar styling is implemented
- Glass-morphism effects are achieved using backdrop blur and transparency
- The UI includes subtle animations and hover effects for enhanced user experience
- The theme detection uses system preferences by default but allows manual override
- The voice interface requires both GEMINI_API_KEY and ELEVENLABS_API_KEY to function properly

## Deployment

The application is configured for deployment to both GitHub Pages and Vercel:

### GitHub Pages
- Uses GitHub Actions workflow in `.github/workflows/deploy.yml`
- Automatically builds and deploys when changes are pushed to the main branch
- Requires `GEMINI_API_KEY` and `ELEVENLABS_API_KEY` to be set as GitHub secrets
- Uses relative paths for compatibility with subdirectory hosting

### Vercel
- Uses `vercel.json` configuration for static build
- Can be deployed via Vercel CLI or GitHub integration
- Requires `GEMINI_API_KEY` and `ELEVENLABS_API_KEY` to be set in Vercel environment variables
- Includes catch-all route handling for SPA navigation

### Environment Variables
- `GEMINI_API_KEY`: Required for API functionality (set in .env.local for local, and in platform-specific settings for production)
- `ELEVENLABS_API_KEY`: Required for ElevenLabs voice interface functionality (set in .env.local for local, and in platform-specific settings for production)