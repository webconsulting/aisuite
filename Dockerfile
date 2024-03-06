# Docker file for Stable diffusion and Automatic1111

# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM pytorch/pytorch:latest

USER root
# Create and change to the app directory.
WORKDIR /usr/src/app

RUN \
    apt-get update && \
    apt-get install -y wget git bc python3.10 python3.10-venv libgl1 libglib2.0-0 && \
    python3.10 -m venv venv

RUN git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

RUN apt install -y --no-install-recommends google-perftools

# COPY docker/stablediffusion/models/* ./stable-diffusion-webui/models/Stable-diffusion/

RUN adduser --disabled-password --gecos '' --shell /bin/bash user \
        && chown -R user:user /usr/src/app

USER user
WORKDIR /usr/src/app

RUN ./stable-diffusion-webui/webui.sh --listen

EXPOSE 7860

# Run the web service on container startup.
#CMD [ "pm2-runtime", "app.js", "-i", "4", "--name", "web" ]

