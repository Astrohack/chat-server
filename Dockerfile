FROM node:20-alpine

WORKDIR /usr/local/verba_server
RUN mkdir -p /usr/local/verba_server

RUN npm install typescript -g \
    && npm install ts-node

COPY package*.json ./

RUN npm i --omit=dev

COPY . .

CMD [ "npx", "ts-node", "start.ts" ]