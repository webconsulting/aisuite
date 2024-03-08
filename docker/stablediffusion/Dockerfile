# Docker file for Stable diffusion and Automatic1111
FROM pytorch/pytorch:latest as stablediffusion

USER root

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y wget git bc python3.10 python3.10-venv libgl1 libglib2.0-0

RUN apt install -y --no-install-recommends google-perftools

RUN adduser --disabled-password --gecos '' --shell /bin/bash user \
         && chown -R user: /usr/src/app

RUN chown -Rf user: /usr/src/app

USER user

RUN git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

COPY ./models/* ./stable-diffusion-webui/models/Stable-diffusion/

WORKDIR /usr/src/app/stable-diffusion-webui

RUN python3.10 -m venv venv

RUN ./webui.sh --listen

EXPOSE 7860

