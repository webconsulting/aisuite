FROM n8nio/n8n:stable

USER root

RUN apk update && \
    apk upgrade -U && \
    apk add chromium openssl qpdf qpdf-fix-qdf && \
    rm -rf /var/cache/*

USER node

WORKDIR /home/node/.n8n/

EXPOSE 5678

USER root

WORKDIR /usr/local/lib/node_modules/n8n
RUN npm install puppeteer --omit=dev
RUN npm install ssh2 --omit=dev

USER node
