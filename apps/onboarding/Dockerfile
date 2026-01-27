# Multi-stage build for Full-Stack Deployment (Monorepo-aware)
# Stage 1: Build Frontend and Backend
FROM node:20 AS builder

WORKDIR /app

# Copy monorepo root package.json for workspace resolution
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install 2>/dev/null || true

# Copy and build onboarding app
COPY apps/onboarding/package*.json apps/onboarding/
WORKDIR /app/apps/onboarding

# Install dependencies (including monorepo deps)
RUN npm ci

# Build frontend and backend
RUN npm run build

# Stage 2: Production Runtime
FROM node:20 AS runner

WORKDIR /app

# Copy only production dependencies
COPY apps/onboarding/package*.json apps/onboarding/
WORKDIR /app/apps/onboarding
RUN npm ci --only=production

# Copy compiled output from builder stage
WORKDIR /app
COPY --from=builder /app/apps/onboarding/dist ./dist

# Expose port
EXPOSE 8787

# Set environment
ENV NODE_ENV=production
ENV PORT=8787

# Start the compiled server (no tsx needed in production)
CMD ["npm", "start"]
