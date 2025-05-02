FROM oven/bun:1.2.7-alpine AS base

WORKDIR /app

# Copy monorepo files first for efficient caching
COPY package.json bun.lock tsconfig.json /app/
COPY apps/api/package.json /app/apps/api/
COPY packages /app/packages/

# Install dependencies for the entire monorepo
RUN bun install

# Build stage
FROM base AS build
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile

# API runtime stage
FROM base AS dev-api
COPY --from=build /app /app
WORKDIR /app/apps/api
EXPOSE ${PORT:-3000}
CMD ["bun", "dev"]
