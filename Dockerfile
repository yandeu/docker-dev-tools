FROM node:14-alpine

WORKDIR /usr/src/app

RUN apk add curl

COPY package*.json ./

COPY server.mjs ./

COPY time.mjs ./

RUN npm install

RUN node time.mjs

EXPOSE 3000

CMD [ "node", "server.mjs" ]