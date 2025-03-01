FROM n8nio/n8n:stable

USER root

RUN cd /usr/local/lib/node_modules/n8n

RUN npm install puppeteer

USER node
WORKDIR /home/node/.n8n

EXPOSE 5678