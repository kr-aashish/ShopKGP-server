FROM node:18-buster-slim

WORKDIR /home/app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]