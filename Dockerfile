FROM node:slim

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD PORT=$PORT node change-port.js

CMD npm start