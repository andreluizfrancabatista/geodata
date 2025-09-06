FROM nginx:alpine

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar página inicial
COPY index.html /usr/share/nginx/html/index.html

# Expor porta
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]