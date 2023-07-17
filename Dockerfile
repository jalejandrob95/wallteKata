FROM node:16

WORKDIR /app-wallet

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm", "run", "dev"]
