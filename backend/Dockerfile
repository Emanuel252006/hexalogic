# Dockerfile para Backend HexaLogic
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto (Railway asignará uno automáticamente)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]

