# 1. Etapa de compilación
FROM oven/bun:latest AS builder
WORKDIR /app

# Instalar dependencias
COPY package.json ./
RUN bun install

# Copiar proyecto y compilar binario
COPY . .
RUN bun run build:bun:pure:compile

# 2. Etapa de ejecución (ligera)
FROM debian:bookworm-slim AS runner
WORKDIR /app

# Certificados para conexiones HTTPS
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copiar el ejecutable y la carpeta .dinou entera
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou ./.dinou

RUN chmod +x ./server

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["./server"]
