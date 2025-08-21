FROM node:22-alpine

EXPOSE 1337

# Base dependency for compilation
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

# Personalization
RUN apk add --no-cache dcron bash postgresql-client

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json pnpm-lock.yaml ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY package.json .
RUN npm install --no-cache

COPY . .
RUN [ "npm", "run", "build" ]

COPY bin bin
RUN chmod +x bin/*.sh

CMD ["/bin/sh", "/opt/app/bin/start.sh"]
