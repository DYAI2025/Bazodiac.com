import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/', // Use absolute paths for Vercel
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
          output: {
            // Ensure compatibility with GitHub Pages
            manualChunks: {
              vendor: ['react', 'react-dom'],
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.ELEVENLABS_API_KEY': JSON.stringify(env.ELEVENLABS_API_KEY) // Add ElevenLabs API key
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
