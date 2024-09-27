FROM node:21-alpine3.20

WORKDIR /front-end

COPY package*.json .

RUN rm -rf node_modules

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "build"]