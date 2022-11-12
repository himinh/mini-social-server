# syntax=docker/dockerfile:1
FROM node:18.12.1
ENV NODE_ENV=production

WORKDIR /src/index

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
