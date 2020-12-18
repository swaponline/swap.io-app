ARG NODE_VERSION=14.7.0

FROM node:${NODE_VERSION} AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install -g @vue/cli
RUN npm install
RUN npm rebuild node-sass

COPY . .

EXPOSE 8080
