# Self-hosted LLM All-in-One
This solution is configured for Nvidia GPUs by default, but you can easily adapt it for other GPUs or use the CPU with LocalAI or VLLM.

## Requirement
- Docker with Compose
- Device with virtualisation enable
- Nivdia Container Toolkit
    https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
- Administrative access to the device
- Ports 80, 443, and others available (See the Traefik section below for a complete port usage list)
- 25GB of disk space for the default configuration

## Installation
1. Clone project.
2. In the project directory, run :
```
./launch mkcert
./launch start
```
3. Optional: Import credentials and default workflows, run:
```
./launch import-n8n-workflows
```
Note : Workflow "Vision image LocalAI" need to install model llava-1.6-mistral on localai (cf 6.)

4. Wait for LocalAI which will download all the default AI models (See container log for progress)
5. launch https://n8n.traefik.me
6. You can easily download new models with a single click at https://localai.traefik.me/browse/

For French text-to-speech, you can use voice-fr-siwis-medium (can replace tts-1).

A better text generation model than the default is llama-3.2-3b-agent007 (can replace gpt-4).

Feel free to test others models.

### Choose Your Favorite LLM Engine and No-Code Tools
By default, the project uses N8N with LocalAI.
You can replace N8N with Flowise or Langflow, and LocalAI with VLLM or Ollama.
Configurations to substitute N8N with Flowise or Langflow, and LocalAI with VLLM or Ollama are included.

### Command with ./launch
| Command                  | Description                                               |
| -----------------------  | --------------------------------------------------------- |
| ./launch start           | Start all default containers                              |
| ./launch stop            | Stop  all containers                                      |
| ./launch flowise         | Open a shell terminal in the Flowise container            |
| ./launch langflow        | Open a shell terminal in the Langflow container           |
| ./launch qdrant          | Open a shell terminal in the Qdrant container             |
| ./launch chromadb        | Open a shell terminal in the Chroma DB container          |
| ./launch stablediffusion | Open a shell terminal in the Stable Diffusion UI          |
| ./launch n8n             | Open a shell terminal in the N8N container                |
| ./launch redis           | Open a redis-cli terminal in the Redis container          |
| ./launch flushcache      | Flush all indexes in the Redis container                  |
| ./launch mkcert          | Install Mkcert and generate SSL certificates (Linux only) |

To launch a configuration other than the default, use Docker Compose with profiles.
Exemples : 
```
docker compose -p aisuite --profile flowise --profile localai --profile qdrant up -d
docker compose -p aisuite --profile langflow --profile ollama up -d
docker compose -p aisuite --profile n8n --profile vllm up -d
```
Note: LocalAI includes Stable Diffusion. To launch the Web UI, add the --profile stablediffusion flag.

## Mkcert Installation on first launch
Mkcert is used to access Docker containers from the host using hostnames.
We'll create a wildcard SSL certificate for the domain traefik.me.

### Install SSL Certificate with Mkcert

Install Mkcert and generate a wildcard certificate for traefik.me (requires sudo):
```
./launch mkcert
```

### Install the SSL Certificate on an Operating System Other Than Linux
Follow the Mkcert installation guide for your OS: https://github.com/FiloSottile/mkcert  

On Windows with WSL, do not use the WSL distribution to install Mkcert.
Mkcert must be installed on the Windows host with administrator access. In a terminal, run:
```
mkcert -install
mkcert "*.traefik.me"
```
These commands will generate two files: _wildcard.traefik.me.pem and _wildcard.traefik.me-key.pem  
Copy and rename _wildcard.traefik.me.pem to ./docker/traefik/cert/cert.pem and
copy _wildcard.traefik.me-key.pem to ./docker/traefik/cert/privkey.pem.

## Traefik
After creating a wildcard certificate on traefik.me with Mkcert, you can access subdomains via HTTPS.

| Service                          | Address from host             | Traefik name    | Address from docker network | Port  |
| -------------------------------- | ----------------------------- | --------------- | --------------------------- | ----- |
| Local Flowise                    | https://flowise.traefik.me    | flowise         | http://flowise:8282         | 8282  |
| Local Langflow                   | https://langflow.traefik.me   | langflow        | http://langflow:7860        | 7862  |
| Local N8N                        | https://n8n.traefik.me        | n8n             | http://n8n:5678             | 8181  |
| Local Stable diffusion UI        | https://sd.traefik.me         | stablediffusion |                             | 7860  |
| Local AI API Server (OPENAI API) | https://localai.traefik.me    | localai         | http://localai:8080         | 8081  |
| VLLM Server (OPENAI API)         | https://vllm.traefik.me       | vllm            | http://vllm:7474            | 7474  |
| Ollama Server (OPENAI API)       | https://ollama.traefik.me     | ollama          | http://ollama:11434         | 11434 |
| Qdrant                           | https://qdrant.traefik.me     | qdrant          | http://qdrant:6333          | 6333  |
| Chroma Db                        |                               | chromadb        | http://chromadb:8000        | 8000  |
| Redis Server                     |                               | redis           | redis://redis:6379          | 6379  |


## Use with default configuration
- Use https://n8n.traefik.me for n8n
- In app configurations use the "Address from Docker Network" address (e.g., for N8N, use the provided OpenAI base URL like http://localai:8080).

## Use Offline
For offline access use 127.0.0.1:
> http://127.0.0.1:8181 (corresponds to n8n.traefik.me)

Or add the following line to your hosts file:
> 127.0.0.1 n8n.traefik.me flowise.traefik.me langflow.traefik.me sd.traefik.me localai.traefik.me vllm.traefik.me ollama.traefik.me qdrant.traefik.me

## LocalAI Default Models
The project uses an all-in-one image of LocalAI, and you can use the following models:

gpt-4 for text generation (actual model: Hermes-2-pro-mistral)

gpt-4-vision-preview for multimodal vision (actual model: llava-1.6-mistral)

stablediffusion for image generation (actual model: dreamshaper-8)

whisper-1 for speech-to-text (actual model: whisper-base)

tts-1 for text-to-speech (using en-us-amy-low.onnx from rhasspy/piper)

text-embedding-ada-002 for embeddings (actual model: all-MiniLM-L6-v2)

## Stable diffusion with UI
The web UI source is cloned as a Docker volume to meet startup speed requirements.

## Integrated Open source projects
Special thanks to all contributors

### Local AI
https://github.com/mudler/LocalAI

### Vllm
https://github.com/vllm-project/vllm

### Ollama
https://ollama.com/

### Flowise 
https://flowiseai.com/

### Langflow 
https://www.langflow.org/

### N8n 
https://n8n.io/

### Stability AI for Stable diffusion
https://stability.ai/

### Qdrant
https://qdrant.tech/

### Chroma
https://www.trychroma.com/

### Traefik
https://doc.traefik.io/traefik/

### Traefik me
https://traefik.me

### Mkcert
https://github.com/FiloSottile/mkcert

### AUTOMATIC1111 for UI on Stable diffusion
https://github.com/AUTOMATIC1111/stable-diffusion-webui.git