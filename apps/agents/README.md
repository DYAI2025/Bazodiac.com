<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy to production.

View your app in AI Studio: https://ai.studio/apps/drive/1izGRzMVj-hj3WEBJrrGBZVjG-S-NLoZz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file and add your API keys (see [.env.example](.env.example) for the format):
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ELEVENLABS_API_KEY=your_actual_elevenlabs_api_key_here
   ```
3. Run the app:
   `npm run dev`

## Deployment

### Deploy to GitHub Pages

The app is configured to automatically deploy to GitHub Pages using GitHub Actions:

1. Enable GitHub Pages in your repository settings (Settings → Pages → Source: GitHub Actions)
2. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy when changes are pushed to the `main` branch

Or deploy manually:
```bash
npm run build
npm run deploy:github  # This requires gh-pages to be set up
```

### Deploy to Vercel

The app is configured for Vercel deployment:

1. Install the Vercel CLI: `npm install -g vercel`
2. Link your project: `vercel`
3. Deploy to production: `npm run deploy:vercel`

Or connect your GitHub repository to Vercel at https://vercel.com/dyai2025s-projects for automatic deployments.

## Environment Variables

- `GEMINI_API_KEY`: Required for the Gemini API integration (set in .env.local for local development, or in platform-specific settings for production)
- `ELEVENLABS_API_KEY`: Required for the ElevenLabs voice functionality (set in .env.local for local development, or in platform-specific settings for production)

## Required API Keys

To run this application, you need both:
1. **Gemini API Key** from Google AI Studio
2. **ElevenLabs API Key** from ElevenLabs to access the voice agents

The ElevenLabs API Key is essential for the voice interface functionality. Without it, the voice agents will not work properly.
# Celestia-agents
