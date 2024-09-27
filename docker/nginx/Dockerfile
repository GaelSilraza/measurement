FROM nginx:1.25.3-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

WORKDIR /etc/nginx/conf.d/

# TODO
# As variáveis para ativar o SSH estão comentadas.
# Em caso de criar um mecanismo de geração de certificados, descomentar e apontar o caminho dos certificados

COPY ./generic-config/ /etc/nginx/
COPY ./conf-services/ .

# TODO
# Verificar depois se pretendem enviar arquivos maiores do que 2GB.
# Caso sim, alterar o valor do client_max_body_size abaixo

RUN sed -i "/http {/a \ \ \ \ client_max_body_size 2G;" /etc/nginx/nginx.conf

RUN mkdir -p /usr/share/nginx/html

EXPOSE 80
# EXPOSE 443


ENTRYPOINT ["nginx", "-g", "daemon off;"]