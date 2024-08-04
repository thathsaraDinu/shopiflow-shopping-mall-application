# Stage 1: Base Image
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY /server /app

# Stage 2: Install dependencies and build the app
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Prepare the runtime environment
FROM node:lts-alpine AS release
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY --from=build /pnpm/store /pnpm/store

RUN pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["node", "src/index.js"]
