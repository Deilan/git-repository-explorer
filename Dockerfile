FROM node:slim

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD npm start -- --port $PORT