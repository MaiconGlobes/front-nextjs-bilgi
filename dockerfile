# docker build -t front-end-gilbi .
FROM node:16-alpine
#FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm cache clean --force \
    && rm -rf node_modules \
    && npm install \
    && npm install -g next \
    && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

