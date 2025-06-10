FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache \
    openssl \
    openssl-dev \
    postgresql-client \
    netcat-openbsd

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install --legacy-peer-deps

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar o resto dos arquivos
COPY . .

# Compilar o projeto
RUN npm run build

# Expor as portas necessárias
EXPOSE 3000 9229 5555

# O comando será definido no docker-compose
CMD ["npm", "run", "start:dev"] 