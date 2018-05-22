FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN git clone --mirror https://github.com/deilan-shri-msk-2018/04-nodejs.git

CMD [ "npm", "start" ]
