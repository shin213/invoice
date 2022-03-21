FROM public.ecr.aws/bitnami/node:14.18.1-prod
WORKDIR /back
COPY package*.json ./
RUN npm install
COPY . .
## react build
RUN npm run build

RUN npm prune --production

CMD ["npm", "run", "migration:run", "npm", "run", "start:prod"]
