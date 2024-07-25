FROM node:20-alpine

WORKDIR /usr/local/verba_server
RUN mkdir -p /usr/local/verba_server/src

RUN npm install typescript -g \
    && npm install ts-node -g \
    && npm i ts-node-dev -g

COPY package*.json .

RUN npm i --verbose --force

WORKDIR /usr/local/verba_server/src

CMD [ "npx", "ts-node", "start.ts"]