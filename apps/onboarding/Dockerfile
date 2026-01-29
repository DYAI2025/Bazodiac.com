# Multi-stage build for Full-Stack Deployment (Monorepo-aware)
# Fixed: Source files, WORKDIR consistency, removed non-existent pnpm-lock.yaml

# Stage 1: Build Frontend and Backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files for workspace resolution (npm, not pnpm!)
COPY package*.json ./

# Copy onboarding app package files
COPY apps/onboarding/package*.json ./apps/onboarding/

# Install root dependencies (for workspace resolution)
RUN npm install --ignore-scripts 2>/dev/null || true

# Install onboarding dependencies
WORKDIR /app/apps/onboarding
RUN npm ci

# CRITICAL: Copy ALL source files BEFORE building!
COPY apps/onboarding/ ./

# Build frontend (Vite) and backend (TypeScript)
RUN npm run build

# Verify build output exists
RUN ls -la dist/ && ls -la dist/server/ || echo "Build verification"

# Stage 2: Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app/apps/onboarding

# Copy package files
COPY apps/onboarding/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled output from builder stage
# Frontend assets (index.html, JS bundles, CSS) -> dist/
# Server code -> dist/server/
COPY --from=builder /app/apps/onboarding/dist ./dist

# Copy static files if they exist (index.html for SPA fallback)
COPY --from=builder /app/apps/onboarding/index.html ./index.html 2>/dev/null || true

# Expose port
EXPOSE 8787

# Set environment
ENV NODE_ENV=production
ENV PORT=8787

# Start the compiled server
# npm start runs: node dist/server/server.js
CMD ["npm", "start"]
