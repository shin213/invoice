FROM public.ecr.aws/bitnami/node:14.18.1-prod
WORKDIR /back
COPY package*.json ./
RUN npm install
COPY . .
## react build
RUN npm run build

CMD ["npm", "run", "start:prod"]
