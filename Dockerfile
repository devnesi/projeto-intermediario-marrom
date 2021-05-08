FROM node:14.13

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]