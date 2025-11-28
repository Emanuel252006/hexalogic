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
RUN test -f server.js || (echo "ERROR: server.js no encontrado" && exit 1)

# Stage 3: Imagen final con Nginx + Backend
FROM node:18-alpine

# Instalar nginx
RUN apk add --no-cache nginx

# Crear directorios necesarios para nginx
RUN mkdir -p /etc/nginx/conf.d /var/log/nginx /var/cache/nginx /run/nginx /usr/share/nginx/html

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
    client_max_body_size 10M;

    include /etc/nginx/conf.d/*.conf;
}
NGINX_MAIN_EOF

# Crear directorio de trabajo
WORKDIR /app

# Copiar backend completo desde el stage de instalación
COPY --from=backend-installer /app/backend /app/backend

# Verificar que los archivos se copiaron correctamente
RUN test -f /app/backend/server.js || (echo "ERROR: server.js no se copió correctamente" && exit 1)

# Copiar el build del frontend desde el stage de build
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Crear archivo de configuración de nginx para el servidor
RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name _ www.hexalogic.com.co hexalogic.com.co;' \
    '    root /usr/share/nginx/html;' \
    '    index index.html;' \
    '' \
    '    # Servir archivos estáticos del frontend' \
    '    location / {' \
    '        try_files $uri $uri/ /index.html;' \
    '    }' \
    '' \
    '    # Proxy para el backend API' \
    '    location /api {' \
    '        proxy_pass http://localhost:3000;' \
    '        proxy_http_version 1.1;' \
    '        proxy_set_header Upgrade $http_upgrade;' \
    '        proxy_set_header Connection "upgrade";' \
    '        proxy_set_header Host $host;' \
    '        proxy_set_header X-Real-IP $remote_addr;' \
    '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' \
    '        proxy_set_header X-Forwarded-Proto $scheme;' \
    '    }' \
    '}' \
    > /etc/nginx/conf.d/default.conf

# Verificar configuración de nginx
RUN nginx -t

# Exponer el puerto 80
EXPOSE 80

# Script para iniciar ambos servicios
RUN cat > /start.sh << 'EOF'
#!/bin/sh
set -e

echo "🚀 Iniciando servicios HexaLogic..."

# Verificar que los archivos estén presentes
if [ ! -f /app/backend/server.js ]; then
    echo "❌ ERROR: server.js no encontrado en /app/backend"
    ls -la /app/backend/
    exit 1
fi

# Iniciar el backend en background
cd /app/backend
echo "📦 Iniciando backend en puerto 3000..."
node server.js &
BACKEND_PID=$!
echo "✅ Backend iniciado (PID: $BACKEND_PID)"

# Esperar un momento para que el backend inicie
echo "⏳ Esperando a que el backend esté listo..."
sleep 3

# Verificar que el backend está respondiendo
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ ERROR: Backend no está corriendo"
    exit 1
fi

# Verificar que nginx puede iniciar
echo "🔍 Verificando configuración de nginx..."
nginx -t || {
    echo "❌ ERROR: Configuración de nginx inválida"
    exit 1
}

# Iniciar nginx en foreground (para que el contenedor no termine)
echo "🌐 Iniciando nginx..."
echo "✅ Todos los servicios están corriendo:"
echo "   - Backend: http://localhost:3000 (PID: $BACKEND_PID)"
echo "   - Nginx: escuchando en puerto 80"
echo "   - Frontend: servido desde /usr/share/nginx/html"
echo ""
echo "🚀 Aplicación lista para recibir peticiones"
exec nginx -g "daemon off;"
EOF

RUN chmod +x /start.sh

# Comando para iniciar ambos servicios
CMD ["/start.sh"]
