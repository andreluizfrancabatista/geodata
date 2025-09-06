# 🚀 Deploy em VPS - Planejador de Semeadura

## Pré-requisitos no VPS

### 1. Instalar Docker
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Instalar Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Instalar Git
```bash
sudo apt update
sudo apt install git -y
```

## Deploy da Aplicação

### 1. Clonar o Repositório
```bash
cd /opt
sudo git clone <url-do-repositorio> planejador-semeadura
sudo chown -R $USER:$USER planejador-semeadura
cd planejador-semeadura
```

### 2. Configurar Ambiente
```bash
# Criar diretório de dados
mkdir -p data

# Tornar script executável
chmod +x create_data_files.sh

# Executar script de dados (se necessário)
./create_data_files.sh
```

### 3. Build e Deploy
```bash
# Build e start dos containers
docker-compose up --build -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

### 4. Configurar Firewall (se necessário)
```bash
# UFW (Ubuntu)
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## Configuração de Domínio (Opcional)

### 1. Nginx Proxy Manager (Recomendado)
```bash
# Criar docker-compose.nginx.yml
cat > docker-compose.nginx.yml << 'EOF'
version: '3.8'

services:
  nginx-proxy-manager:
    image: 'jc21/nginx-proxy-manager:latest'
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./nginx-data:/data
      - ./letsencrypt:/etc/letsencrypt
    restart: unless-stopped

networks:
  default:
    external:
      name: planejador-semeadura_default
EOF

# Executar
docker-compose -f docker-compose.nginx.yml up -d
```

### 2. Configurar SSL com Let's Encrypt
- Acesse http://seu-ip:81
- Configure proxy host apontando para `planejador_frontend:80`
- Ative SSL com certificado automático

### 3. Configuração Manual do Nginx
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Configurar proxy no nginx
sudo nano /etc/nginx/sites-available/planejador
```

Configuração do Nginx:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Comandos Úteis de Manutenção

### Logs
```bash
# Ver logs em tempo real
docker-compose logs -f

# Logs específicos
docker-compose logs backend
docker-compose logs frontend

# Logs com timestamp
docker-compose logs -t
```

### Atualizações
```bash
# Parar aplicação
docker-compose down

# Atualizar código
git pull

# Rebuild e restart
docker-compose up --build -d

# Limpar imagens antigas
docker image prune -f
```

### Backup de Dados
```bash
# Backup automático dos CSVs
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# Restaurar backup
tar -xzf backup-20241201.tar.gz
```

### Monitoramento
```bash
# Status dos containers
docker-compose ps

# Uso de recursos
docker stats

# Espaço em disco
df -h
docker system df
```

## Variáveis de Ambiente para Produção

Criar arquivo `.env`:
```bash
# Backend
NODE_ENV=production
PORT=3001
API_BASE_URL=https://seu-dominio.com/api

# Frontend  
VITE_API_URL=https://seu-dominio.com/api
```

Atualizar `docker-compose.yml`:
```yaml
services:
  backend:
    environment:
      - NODE_ENV=production
      - PORT=3001
    env_file:
      - .env
```

## Troubleshooting

### Problemas Comuns

1. **Erro de permissão nos dados**:
```bash
sudo chown -R 1001:1001 data/
```

2. **Container não inicia**:
```bash
docker-compose logs backend
docker-compose logs frontend
```

3. **Porta já em uso**:
```bash
sudo netstat -tulpn | grep :80
sudo fuser -k 80/tcp
```

4. **Problemas de memória**:
```bash
# Verificar uso
free -h
# Aumentar swap se necessário
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Health Check
```bash
# Verificar se aplicação está respondendo
curl http://localhost/api/health

# Verificar frontend
curl -I http://localhost
```

## Segurança

### 1. Configurações Básicas
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Configurar firewall
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### 2. Monitoramento
```bash
# Instalar fail2ban
sudo apt install fail2ban -y

# Logs de acesso
tail -f /var/log/nginx/access.log
```

### 3. Backup Automatizado
```bash
# Crontab para backup diário
crontab -e

# Adicionar linha:
0 2 * * * /opt/planejador-semeadura/backup.sh
```

Criar `backup.sh`:
```bash
#!/bin/bash
cd /opt/planejador-semeadura
tar -czf /backup/planejador-$(date +%Y%m%d).tar.gz data/
find /backup -name "planejador-*.tar.gz" -mtime +7 -delete
```

---

## 📞 Suporte

Para problemas específicos de deploy, verifique:
1. Logs dos containers
2. Configuração de rede
3. Permissões de arquivo
4. Recursos disponíveis (CPU/RAM/Disco)

A aplicação estará disponível em `http://seu-ip` ou `https://seu-dominio.com` após o deploy.