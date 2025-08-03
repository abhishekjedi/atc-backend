# Stage 1: Build TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
