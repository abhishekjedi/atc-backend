# Stage 1: Build TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source code and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built files and Prisma schema
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV=production

# Run app (migrate + start)
CMD sh -c "npx prisma migrate deploy && node dist/index.js"
