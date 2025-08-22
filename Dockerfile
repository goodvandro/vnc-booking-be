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

# Definir diretório de trabalho
WORKDIR /opt/app

# Copiar arquivos de dependências
COPY package*.json ./

# Limpar cache do npm e instalar dependências
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json

# Instalar sharp específico para Alpine Linux
RUN npm install --platform=linux --arch=x64 --libc=musl sharp

# Instalar o restante das dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Criar diretório para uploads se não existir
RUN mkdir -p public/uploads

# Expor porta do Strapi
EXPOSE 1337

# Comando para desenvolvimento (com hot reload)
CMD ["npm", "run", "develop"]