FROM node:18.15

WORKDIR /app

COPY . . 

RUN npm ci

ENV PORT=3000

EXPOSE $PORT

CMD [ "npm", "run", "faucet" ]