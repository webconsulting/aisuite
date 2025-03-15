FROM n8nio/n8n:stable

USER root

RUN apk update && \
    apk upgrade -U && \
    apk add --no-cache \
    chromium \ 
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    udev \
    ttf-liberation \
    font-noto-emoji \
    openssl qpdf qpdf-fix-qdf && \
    rm -rf /var/cache/*

USER node

WORKDIR /home/node/.n8n/

#All of the following is for installing external node modules
RUN n8n &

RUN sleep 20

EXPOSE 5678

USER root

WORKDIR /usr/local/lib/node_modules/n8n

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_CACHE_DIR=/home/node/.cache/puppeteer

RUN npm install puppeteer --omit=dev
RUN npm install ffmpeg

COPY *extra-packages.txt /usr/local/lib/node_modules/n8n/extra-packages.txt

RUN if [ -f /usr/local/lib/node_modules/n8n/extra-packages.txt ]; then \
      cat /usr/local/lib/node_modules/n8n/extra-packages.txt && \
      xargs npm install --omit=dev < /usr/local/lib/node_modules/n8n/extra-packages.txt; \
    fi

USER node
WORKDIR /home/node/.n8n/

