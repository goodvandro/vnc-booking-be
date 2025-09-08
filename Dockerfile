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

# Copiar arquivos de dependências
COPY package*.json pnpm-lock.yaml ./

# Limpar cache
RUN pnpm store prune
RUN rm -rf node_modules package-lock.json

# Atualizar package.json para incluir provider de email se não estiver
RUN if ! grep -q "@strapi/provider-email-nodemailer" package.json; then \
      pnpm add @strapi/provider-email-nodemailer; \
    fi

# Instalar sharp específico para Alpine Linux
RUN pnpm add --save-exact sharp --config.target_platform=linux --config.target_arch=x64 --config.target_libc=musl

# Instalar todas as dependências
RUN pnpm install --frozen-lockfile

# Copiar código da aplicação
COPY . .

# Criar diretório para uploads se não existir
RUN mkdir -p public/uploads

# Verificar se o provider foi instalado corretamente
RUN ls -la node_modules/@strapi/ | grep provider-email || echo "Provider não encontrado!"

# Expor porta do Strapi
EXPOSE 1337

# Comando para desenvolvimento (com hot reload)
CMD ["pnpm", "run", "develop"]