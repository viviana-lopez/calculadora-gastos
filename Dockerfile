# Imagen base
FROM nginx:alpine

# Copiar archivos al servidor nginx
COPY . /usr/share/nginx/html

# Exponer puerto
EXPOSE 80