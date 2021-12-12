FROM node:16.13.1

WORKDIR /main
COPY ./server/listingapi.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 5555

CMD ["node", "listingapi.js"]