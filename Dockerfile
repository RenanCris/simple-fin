FROM node:14-alpine

WORKDIR /app-fin

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn","start"]