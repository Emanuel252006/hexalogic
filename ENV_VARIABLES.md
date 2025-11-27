# Variables de Entorno para HexaLogic

## Backend

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
PORT=3000
NODE_ENV=production

# Brevo (Sendinblue) Configuration
BREVO_API_KEY=tu_api_key_aqui
BREVO_SMTP_KEY=tu_smtp_key_aqui
BREVO_SENDER_EMAIL=hexalogic20@gmail.com
BREVO_SENDER_NAME=HexaLogic

# Frontend URL para CORS
FRONTEND_URL=http://localhost:5173
```

## Frontend

Crea un archivo `.env.production` en la carpeta `frontend/` con:

```env
VITE_API_URL=http://localhost:3000
```

## Railway

En Railway, configura estas variables en cada servicio:

### Backend Service
- `PORT` (Railway lo asigna automáticamente)
- `BREVO_API_KEY` (requerida)
- `BREVO_SMTP_KEY` (opcional)
- `BREVO_SENDER_EMAIL` (requerida)
- `BREVO_SENDER_NAME` (opcional)
- `FRONTEND_URL` (URL del frontend desplegado)

### Frontend Service
- `VITE_API_URL` (URL del backend desplegado)

