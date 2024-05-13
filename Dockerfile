FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma migrate dev --name new

RUN npx prisma generate

EXPOSE 8000

CMD [ "npm","start" ]