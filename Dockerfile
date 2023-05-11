FROM node:18.15

WORKDIR /app

COPY . . 

CMD [ "npm", "run", "faucet" ]