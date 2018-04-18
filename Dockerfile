FROM node:carbon

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD npm start -- --port $PORT