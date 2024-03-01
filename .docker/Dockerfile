# Base Stage
FROM node:21-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Dependencies Stage for Production
FROM base AS deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build Stage
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . . 

RUN pnpm run build

# Deploy Stage
FROM base AS deploy

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build

# Run as non-root user
USER node

ENV NODE_ENV=production

CMD ["node", "build"]
