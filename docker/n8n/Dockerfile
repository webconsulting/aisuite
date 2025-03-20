FROM n8nio/n8n:stable

USER root

RUN apk update && \
    apk upgrade -U && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    openssl qpdf qpdf-fix-qdf && \
    rm -rf /var/cache/*

RUN chown -R node:node /usr/local/lib/node_modules/n8n

USER node

WORKDIR /usr/local/lib/node_modules/n8n

ENV PUPPETEER_CACHE_DIR="/home/node/.cache/puppeteer"
ENV PUPPETEER_DOWNLOAD_PATH="/home/node/.cache/puppeteer"

RUN npm install puppeteer --omit=dev
RUN npm exec puppeteer browsers install chrome

COPY *extra-packages.txt /usr/local/lib/node_modules/n8n/extra-packages.txt

RUN if [ -f /usr/local/lib/node_modules/n8n/extra-packages.txt ]; then \
      cat /usr/local/lib/node_modules/n8n/extra-packages.txt && \
      xargs npm install --omit=dev < /usr/local/lib/node_modules/n8n/extra-packages.txt; \
    fi

WORKDIR /home/node/.n8n/

EXPOSE 5678
