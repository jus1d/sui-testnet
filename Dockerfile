FROM node:18.15

WORKDIR /app

COPY . . 

COPY package.json package.json

RUN npm i

ENV PORT=21019

EXPOSE $PORT

CMD [ "npm", "run", "faucet" ]