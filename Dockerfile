FROM node:18.15

WORKDIR /app

COPY package.json package.json

COPY .env .env

COPY . . 

CMD [ "npm", "run", "faucet" ]