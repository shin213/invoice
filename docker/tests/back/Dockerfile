FROM node:16.13.1-alpine AS builder
WORKDIR /back
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "test" ]
