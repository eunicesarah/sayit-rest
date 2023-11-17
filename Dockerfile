FROM node:16-alpine3.14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY .npmrc .
COPY src ./src
COPY prisma ./prisma

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]