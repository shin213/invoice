FROM public.ecr.aws/bitnami/node:16.14.2
WORKDIR /back
COPY package*.json ./
RUN npm install
COPY . .
## react build
RUN npm run build

# RUN npm prune --production

CMD npm run migration:run && npm run seed && npm run start:prod
