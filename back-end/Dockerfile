FROM node:21-alpine3.20

WORKDIR /back-end

COPY package*.json .

RUN rm -rf node_modules

COPY . .

RUN npm install

RUN apk add --no-cache bash

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE $BACKEND_PORT

# TODO
# Posteriormente otimizar a imagem do container para a produção
# Posteriormente criar um usuário próprio dentro do container e restringir o acesso apenas a aplicação

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh db:$DB_PORT -- npm run typeorm migration:run && npm run start"]
