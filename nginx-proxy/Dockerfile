FROM nginx:alpine

# Copiar página inicial
COPY index.html /usr/share/nginx/html/index.html

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Criar diretório de logs
RUN mkdir -p /var/log/nginx

# Dar permissões corretas
RUN chmod 644 /usr/share/nginx/html/index.html
RUN chmod 644 /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Testar configuração antes de iniciar
RUN nginx -t

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]