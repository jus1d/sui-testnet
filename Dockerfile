FROM node:18.15

WORKDIR /app

COPY . . 

RUN npm ci

ENV PORT=21019

EXPOSE $PORT

CMD [ "npm", "start-faucet" ]