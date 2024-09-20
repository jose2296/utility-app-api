FROM node:20

WORKDIR /usr/www

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]