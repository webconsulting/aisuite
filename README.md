The objective of this project is the installation in a single command of a suite of tools to use IA.  
The project installs a flowise and a stable diffusion web UI to use.  
All tools are local! So you can use them without an Internet connection.

# Requirement

- Docker with compose
- Device with virtualisation enable
- Admin access to device

# Installation
- Install Mkcert
- launch ./launch

## Install notes
the first execution can be very long to download the different basic models

### Vllm not enable
Vllm container as the same thing than localai container.  
For free memory, we need only one.  
For install VLLM uncomment section on docker-compose.yml  
You need to be connected to huggingface for first start to download model  

### Stable diffusion with UI
Source of webui is clone as a volume docker for startup speed requirements

### Command with ./launch
| Command                  | Description                            |
| -----------------------  | -------------------------------------- |
| ./launch start           | Start all containers                   |
| ./launch stop            | Stop  all containers                   |
| ./launch flowise         | Flowise container sh terminal          |
| ./launch chromadb        | Chromadb container sh terminal         |
| ./launch stablediffusion | Stable diffusion container sh terminal |
| ./launch redis           | Redis container redis-cli terminal     |
| ./launch flushcache      | Flush all index of redis container     |
| ./launch mysql           | Mysql container Mysql terminal         |


## Mkcert (Optionnal)
Mkcert is used to access Docker containers from the host with hostname  
We'll create a wildcard SSL certificate for the domain traefik.me

### Install SSL cert with Mkcert
Download requirements and move binary in user bin folder
```
sudo apt update && sudo apt install libnss3-tools
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"	
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```
Install Mkcert and wildcard for traefik.me
```
mkcert -install
mkcert "*.traefik.me"
```
Next command need to be executed on aisuite folder
```
mv _wildcard.traefik.me.pem ./docker/traefik/cert/cert.pem
mv _wildcard.traefik.me-key.pem ./docker/traefik/cert/privkey.pem
```

### Install SSL cert On Windows, Windows with WSL, Mac
Follow install of Mkcert on your OS : https://github.com/FiloSottile/mkcert  
Windows need to use for WSL, don't use the container for install mkcert.  
On a Windows terminal with admin access:
```
mkcert -install
mkcert "*.traefik.me"
```
The command will generate 2 files : _wildcard.traefik.me.pem and _wildcard.traefik.me-key.pem  
copy and rename _wildcard.traefik.me.pem to ./docker/traefik/cert/cert.pem (command need to be executed on aisuite folder)  
and copy _wildcard.traefik.me-key.pem to ./docker/traefik/cert/privkey.pem

### Need more ?
Please use Mkcert documentation : https://github.com/FiloSottile/mkcert

## Traefik
define domains for access to container from host : subdomain of traefik.me

| Service                       | http from host                | Traefik name    | http from docker network |
| ----------------------------- | ----------------------------- | --------------- | ------------------------ | 
| Local Flowise                 | https://flowise.traefik.me    | flowise         | http://flowise:8282      |
| Local Stable diffusion UI     | http://sd.traefik.me          | stablediffusion |                          |
| Local VLLM AI API Server      | https://vllm.traefik.me       | vllm            | http://vllm:7474         |
| Local AI API Server           | https://localai.traefik.me    | localai         | http://localai:8080      |
| Local Chroma Db               | https://chroma.traefik.me     | chromadb        | http://chromadb:8000     |
| Local Redis Server            | redis://redis.traefik.me      | redis           | redis://redis:6379       |


# Integrated Open source project
Special thanks to all contributors

## Local AI
https://github.com/mudler/LocalAI

## Vllm
https://github.com/vllm-project/vllm

## Flowise 
https://flowiseai.com/

## Mistral AI
https://mistral.ai/

## Stability AI for Stable diffusion
https://stability.ai/

## Chroma
https://www.trychroma.com/

## Traefik
https://traefik.me

## Mkcert
https://github.com/FiloSottile/mkcert

## AUTOMATIC1111 for UI on Stable diffusion
https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

# Use
- https://sd.treafik.me for use Stable diffusion web UI
- https://flowise.traefik.me for use flowise  
- Use "http from docker network" (see above) for url in flowise
