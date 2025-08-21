# Use a imagem oficial do Node.js
FROM node:18-alpine

# Instalar dependências do sistema necessárias
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
    git

# Definir diretório de trabalho
WORKDIR /opt/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código da aplicação
COPY . .

# Criar diretório para uploads se não existir
RUN mkdir -p public/uploads

# Expor porta do Strapi
EXPOSE 1337

# Comando para desenvolvimento (com hot reload)
CMD ["npm", "run", "develop"]