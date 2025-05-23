FROM node:20.11.0-alpine AS deps
RUN apk --no-cache add libc6-compat git
WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install

FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn generate
RUN yarn build

FROM node:20.11.0-alpine AS runner
RUN apk --no-cache add dumb-init
RUN mkdir -p /app && chown node:node /app
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 80
ENV PORT 80

CMD [ "dumb-init", "node", "server.js" ]
