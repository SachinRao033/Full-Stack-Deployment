FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod -R 777 /app

EXPOSE 5000

CMD ["node", "index.js"]
