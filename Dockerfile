# Use a imagem oficial do Node.js (versão 20 para compatibilidade)
FROM node:20-alpine

# Instalar dependências do sistema necessárias para Sharp e Strapi
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    python3 \
    make \
    g++

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /opt/app

# Copiar arquivos de dependências (incluir pnpm-lock.yaml)
COPY package*.json pnpm-lock.yaml ./

# Limpar cache e arquivos de lock antigos
RUN pnpm store prune
RUN rm -rf node_modules package-lock.json

# Instalar sharp específico para Alpine Linux primeiro
RUN pnpm add --save-exact sharp --config.target_platform=linux --config.target_arch=x64 --config.target_libc=musl

# Instalar todas as dependências com pnpm
RUN pnpm install --frozen-lockfile

# Copiar código da aplicação
COPY . .

# Criar diretório para uploads se não existir
RUN mkdir -p public/uploads

# Expor porta do Strapi
EXPOSE 1337

# Comando para desenvolvimento (com hot reload)
CMD ["pnpm", "run", "develop"]