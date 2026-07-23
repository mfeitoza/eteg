FROM node:lts-bookworm-slim AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
RUN node ace build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./
RUN npm ci --omit=dev

COPY docker-entrypoint.js ./

EXPOSE 3333
CMD ["node", "docker-entrypoint.js"]