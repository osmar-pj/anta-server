FROM node:18-alpine3.16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . .

EXPOSE 3100

CMD [ "npm", "start" ]