# Dockerfile multi-stage para HexaLogic (Frontend + Backend)
# Stage 1: Build del Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copiar archivos de dependencias del frontend
COPY frontend/package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar el resto de los archivos del frontend
COPY frontend/ ./

# Build de la aplicación frontend
# No pasamos VITE_API_URL para usar rutas relativas (/api)
# Nginx hará proxy de /api al backend en el puerto 3000
RUN npm run build

# Stage 2: Instalación del Backend
FROM node:18-alpine AS backend-installer

WORKDIR /app/backend

# Copiar archivos de dependencias del backend
COPY backend/package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto de los archivos del backend (incluyendo server.js)
COPY backend/ ./

# Verificar que server.js esté presente
RUN ls -la && test -f server.js || (echo "ERROR: server.js no encontrado" && exit 1)

# Stage 3: Imagen final con Nginx + Backend
FROM node:18-alpine

# Instalar nginx
RUN apk add --no-cache nginx

# Crear directorios necesarios para nginx
RUN mkdir -p /etc/nginx/conf.d /var/log/nginx /var/cache/nginx /run/nginx /usr/share/nginx/html

# Crear archivo mime.types básico si no existe
RUN echo 'types {
    text/html                             html htm shtml;
    text/css                              css;
    application/javascript                js;
    application/json                      json;
    image/gif                             gif;
    image/jpeg                            jpeg jpg;
    image/png                             png;
    image/svg+xml                         svg svgz;
    application/x-font-ttf                ttf;
    application/x-font-opentype           otf;
    application/font-woff                 woff;
    application/font-woff2                woff2;
}' > /etc/nginx/mime.types

# Crear configuración principal de nginx
RUN cat > /etc/nginx/nginx.conf << 'NGINX_MAIN_EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /run/nginx/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;
}
NGINX_MAIN_EOF

# Crear directorio de trabajo
WORKDIR /app

# Copiar backend completo desde el stage de instalación
# Verificar que se copien todos los archivos incluyendo server.js
COPY --from=backend-installer /app/backend /app/backend

# Verificar que los archivos se copiaron correctamente
RUN ls -la /app/backend/ && test -f /app/backend/server.js || (echo "ERROR: server.js no se copió correctamente" && exit 1)

# Copiar el build del frontend desde el stage de build
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Configurar nginx
# Crear archivo de configuración de nginx con formato correcto
RUN printf 'server {\n\
    listen 80;\n\
    server_name _ www.hexalogic.com.co hexalogic.com.co;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Servir archivos estáticos del frontend\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Proxy para el backend API\n\
    location /api {\n\
        proxy_pass http://localhost:3000;\n\
        proxy_http_version 1.1;\n\
        proxy_set_header Upgrade $http_upgrade;\n\
        proxy_set_header Connection "upgrade";\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Verificar que el archivo se creó correctamente
RUN cat /etc/nginx/conf.d/default.conf && nginx -t

# Exponer el puerto 80
EXPOSE 80

# Script para iniciar ambos servicios
RUN cat > /start.sh << 'EOF'
#!/bin/sh
set -e

echo "🚀 Iniciando servicios HexaLogic..."

# Verificar que los archivos estén presentes
echo "📋 Verificando archivos..."
ls -la /app/backend/ || echo "⚠️  Directorio backend no encontrado"
ls -la /app/backend/server.js || echo "⚠️  server.js no encontrado"

# Iniciar el backend en background
cd /app/backend
echo "📦 Iniciando backend en puerto 3000..."
if [ -f server.js ]; then
    node server.js &
    BACKEND_PID=$!
    echo "✅ Backend iniciado (PID: $BACKEND_PID)"
else
    echo "❌ ERROR: server.js no encontrado en /app/backend"
    ls -la /app/backend/
    exit 1
fi

# Esperar un momento para que el backend inicie
echo "⏳ Esperando a que el backend esté listo..."
sleep 3

# Verificar que nginx puede iniciar
echo "🔍 Verificando configuración de nginx..."
nginx -t || {
    echo "❌ ERROR: Configuración de nginx inválida"
    cat /etc/nginx/conf.d/default.conf
    exit 1
}

# Iniciar nginx en foreground (para que el contenedor no termine)
echo "🌐 Iniciando nginx..."
exec nginx -g "daemon off;"
EOF
RUN chmod +x /start.sh

# Comando para iniciar ambos servicios
CMD ["/start.sh"]
