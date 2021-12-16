FROM node:16.13.1

WORKDIR /main
COPY ./server/websocket.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 6000

CMD ["node", "websocket.js"]