# 開発環境
FROM node:16.13.1-alpine as development
WORKDIR /front
COPY . .

# ビルド環境
FROM node:16.13.1-alpine AS builder
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY . .
## set environment variables before react build
ARG REACT_APP_APP_ENV
ARG REACT_APP_BACK_HOST
ARG REACT_APP_BACK_PORT
ENV REACT_APP_APP_ENV $REACT_APP_APP_ENV
ENV REACT_APP_BACK_HOST $REACT_APP_BACK_HOST
ENV REACT_APP_BACK_PORT $REACT_APP_BACK_PORT
ENV NODE_OPTIONS "--max-old-space-size=2048"
## react build
RUN npm run build

# デプロイ環境
FROM nginx:1.21-alpine AS deploy
WORKDIR /front
COPY --from=builder /front/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
