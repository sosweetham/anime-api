FROM oven/bun:1.2.7-alpine AS base

WORKDIR /app

# Copy monorepo files first for efficient caching
COPY package.json bun.lock tsconfig.json /app/
COPY apps/api/package.json /app/apps/api/
COPY packages/*/package.json /app/packages/

# Install dependencies for the entire monorepo
RUN bun install

# Build stage
FROM base AS build
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile

# API runtime stage
FROM base AS api
COPY --from=build /app /app
WORKDIR /app/apps/api
EXPOSE 3000
# Valkey Glide https://github.com/valkey-io/valkey-glide/issues/2985
# https://github.com/valkey-io/valkey-glide/issues/2985#issuecomment-2606172206
CMD ["bun", "dev"] 