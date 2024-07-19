Commands for install suite of local tools for using AI


# Requirement

- Docker with compose
- Device with virtualisation enable
- Nivdia container tools https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
- Admin access to device
- 40Go disk space (By comment section stablediffusion in dockercompose.yml you'll need only 12Go but can't generate images)
- Ports 80, 443 and others available (Read section Traefik bellow for a complete port usage list)

# Installation
Clone project.
In project path folder run :
```
./launch mkcert
./launch start
```

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
| ./launch mkcert          | Install Mkcert and generate SSL cert   | # Only for linux


## Mkcert Installation on first launch
Mkcert is used to access Docker containers from the host with hostname  
We'll create a wildcard SSL certificate for the domain traefik.me

### Install SSL cert with Mkcert

Install Mkcert and wildcard for traefik.me (need sudo)
```
./launch mkcert
```

### Install the SSL certificate on an operating system other than Linux
Follow install of Mkcert on your OS : https://github.com/FiloSottile/mkcert  

On Windows with WSL, do not use the wsl distribution to install mkcert.
Mkcert must be installed on Windows host operating system with administrator access, in a terminal:
```
mkcert -install
mkcert "*.traefik.me"
```
The command will generate 2 files : _wildcard.traefik.me.pem and _wildcard.traefik.me-key.pem  
copy and rename _wildcard.traefik.me.pem to ./docker/traefik/cert/cert.pem (command need to be executed on aisuite folder)  
and copy _wildcard.traefik.me-key.pem to ./docker/traefik/cert/privkey.pem

## Traefik
After create a wildcard on traefik.me domain with mkcert, we can access subdomain with https

| Service                          | Address from host             | Traefik name    | Address from docker network | Port |
| -------------------------------- | ----------------------------- | --------------- | --------------------------- | ---- |
| Local Flowise                    | https://flowise.traefik.me    | flowise         | http://flowise:8282         | 8282 |
| Local Stable diffusion UI        | https://sd.traefik.me         | stablediffusion |                             | 7860 |
| Local AI API Server (OPENAI API) | https://localai.traefik.me    | localai         | http://localai:8080         | 8080 |
| Local Chroma Db                  |                               | chromadb        | http://chromadb:8000        | 8000 |
| Local Redis Server               |                               | redis           | redis://redis:6379          | 6379 |
| #Local VLLM Server (OPENAI API)  | https://vllm.traefik.me       | vllm            | http://vllm:7474            | 7474 |


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
https://doc.traefik.io/traefik/

## Traefik me
https://traefik.me

## Mkcert
https://github.com/FiloSottile/mkcert

## AUTOMATIC1111 for UI on Stable diffusion
https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

# Use
- https://sd.treafik.me for use Stable diffusion web UI
- https://flowise.traefik.me for use flowise  
- Use "http from docker network" (see above) for hostname in flowise

## Use Offline
For use offline use 127.0.0.1 for access apps
> http://127.0.0.1:8282 # flowise.traefik.me
> http://127.0.0.1:7860 # sd.traefik.me

Or add a row in you're host
> 127.0.0.1 sd.traefik.me flowise.traefik.me

## Change models of localai
In docker-compose.yml you can update localai section, on row command  
`command: mixtral-instruct mistral-openorca bert-cpp all-minilm-l6-v2`  
Available models and models for cuda 11 : https://localai.io/basics/getting_started/#running-models 
Available for embedding in project : text-embedding-ada-002 and bert-cpp-minilm-v6
Available for chat in project : mixtral-instruct and mistral-openorca
You need one ai model for conversationnal api and one for embedding api 
Exemples include in this projet use only mistral-openorca and bert-cpp-minilm-v6
By update the command a restart will download new models automatically. 
