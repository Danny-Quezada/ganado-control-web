# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Variables para Vite
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_KEY=$VITE_SUPABASE_KEY

RUN npm run build


# Etapa final: usar serve
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4173

# -s = Single Page App (SPA) → evita el 404 en rutas como /login
CMD ["serve", "-s", "dist", "-l", "4173"]
