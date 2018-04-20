FROM node:slim

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD node change-port.js $PORT && npm start