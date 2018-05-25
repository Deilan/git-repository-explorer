FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN git clone --mirror https://github.com/deilan-shri-msk-2018/04-nodejs.git .git

COPY . .

CMD [ "npm", "start" ]
