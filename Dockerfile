# Set up the backend first
FROM oven/bun:latest AS backend

WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

CMD ["bun", "index.ts"]
