# Etapa de construcción
FROM node:20-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Compilar TypeScript (opcional, si usas build)
# RUN pnpm build

# Etapa de producción
FROM node:20-alpine

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar node_modules y código desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json* ./
COPY --from=builder /app/prisma ./prisma

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]
