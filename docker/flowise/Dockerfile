# Docker file for Flowise
FROM node:20.11-alpine3.19

USER root

WORKDIR /usr/src/app

RUN rm -rf /var/cache/* && \
    apk update && \
    apk upgrade -U && \
    apk add git python3 py3-pip make g++ build-base cairo-dev pango-dev chromium

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm install -g flowise

RUN npm update

RUN npm audit fix

WORKDIR /data

CMD ["/bin/sh" "-c" "\"flowise\""]

