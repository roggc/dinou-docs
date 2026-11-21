# 1. Compilation Stage (100% Bun, Zero Node.js required)
FROM oven/bun:latest AS builder
WORKDIR /app

# Symlink so #!/usr/bin/env node CLI shebangs execute Bun transparently
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Install dependencies cleanly
COPY package.json package-lock.json* ./
RUN bun install

# Copy application source and compile standalone binary
COPY . .
RUN bun run build:bun:pure:compile

# 2. Minimal Production Runner Stage
FROM debian:bookworm-slim AS runner
WORKDIR /app

# Install CA certificates for outbound HTTPS connections
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy standalone executable + pre-rendered SSG cache (dist2) & public static assets (dist3)
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou/dist2 ./.dinou/dist2
COPY --from=builder /app/.dinou/dist3 ./.dinou/dist3

RUN chmod +x ./server

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["./server"]
