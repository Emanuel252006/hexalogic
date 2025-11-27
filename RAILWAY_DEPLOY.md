# Guía de Despliegue en Railway

Esta guía te ayudará a desplegar HexaLogic en Railway usando Docker.

## 📋 Requisitos Previos

- Cuenta en [Railway](https://railway.app)
- Repositorio en GitHub (ya lo tienes: https://github.com/Emanuel252006/hexalogic)

## 🚀 Pasos para Desplegar

### 1. Desplegar el Backend

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Haz clic en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Conecta tu repositorio `hexalogic`
5. Selecciona el repositorio y haz clic en **"Deploy Now"**
6. Railway detectará automáticamente el Dockerfile en la carpeta `backend`

#### Configurar Variables de Entorno del Backend

En la pestaña **Variables** del servicio backend, agrega:

```
PORT=3000
NODE_ENV=production
BREVO_API_KEY=tu_api_key_de_brevo
BREVO_SMTP_KEY=tu_smtp_key_de_brevo (opcional)
BREVO_SENDER_EMAIL=hexalogic20@gmail.com
BREVO_SENDER_NAME=HexaLogic
FRONTEND_URL=https://tu-frontend.railway.app
```

**Nota:** `FRONTEND_URL` lo actualizarás después de desplegar el frontend.

#### Configurar el Root Directory

En la pestaña **Settings** del servicio backend:
- **Root Directory:** `backend`

### 2. Desplegar el Frontend

1. En el mismo proyecto de Railway, haz clic en **"+ New"** → **"Service"**
2. Selecciona **"GitHub Repo"** y elige el mismo repositorio `hexalogic`
3. Railway detectará el Dockerfile en la carpeta `frontend`

#### Configurar Variables de Entorno del Frontend

En la pestaña **Variables** del servicio frontend, agrega:

```
VITE_API_URL=https://tu-backend.railway.app
```

**Nota:** Reemplaza `tu-backend.railway.app` con la URL real que Railway te asignó al backend.

#### Configurar el Root Directory

En la pestaña **Settings** del servicio frontend:
- **Root Directory:** `frontend`

#### Configurar Build Args (si es necesario)

En la pestaña **Settings** → **Build**, agrega:

```
VITE_API_URL=https://tu-backend.railway.app
```

### 3. Obtener las URLs de Despliegue

1. En cada servicio (backend y frontend), ve a la pestaña **Settings**
2. Haz clic en **"Generate Domain"** para obtener una URL pública
3. Copia las URLs generadas

### 4. Actualizar Variables de Entorno

#### Backend
Actualiza `FRONTEND_URL` con la URL del frontend:
```
FRONTEND_URL=https://tu-frontend.railway.app
```

#### Frontend
Actualiza `VITE_API_URL` con la URL del backend:
```
VITE_API_URL=https://tu-backend.railway.app
```

**Importante:** Después de cambiar estas variables, Railway reconstruirá automáticamente el frontend.

### 5. Configurar Dominios Personalizados (Opcional)

Si tienes un dominio personalizado:

1. En la pestaña **Settings** de cada servicio
2. Ve a **"Custom Domain"**
3. Agrega tu dominio y sigue las instrucciones para configurar los DNS

## 🔧 Configuración Alternativa: Monorepo con Railway

Si prefieres desplegar todo desde la raíz del proyecto:

### Backend
- **Root Directory:** `backend`
- **Dockerfile Path:** `backend/Dockerfile`

### Frontend
- **Root Directory:** `frontend`
- **Dockerfile Path:** `frontend/Dockerfile`

## 📝 Variables de Entorno Requeridas

### Backend
| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor (Railway lo asigna automáticamente) | No |
| `BREVO_API_KEY` | API Key de Brevo para envío de correos | Sí |
| `BREVO_SMTP_KEY` | SMTP Key de Brevo (opcional, fallback) | No |
| `BREVO_SENDER_EMAIL` | Email remitente | Sí |
| `BREVO_SENDER_NAME` | Nombre del remitente | No |
| `FRONTEND_URL` | URL del frontend para CORS | Sí |

### Frontend
| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_API_URL` | URL del backend API | Sí |

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Railway Dashboard → Service → Deployments → Logs

### El frontend no puede conectar con el backend
- Verifica que `VITE_API_URL` apunte a la URL correcta del backend
- Asegúrate de que el backend esté desplegado y funcionando
- Verifica que `FRONTEND_URL` en el backend coincida con la URL del frontend

### Error de CORS
- Verifica que `FRONTEND_URL` en el backend sea exactamente la URL del frontend (con https://)
- Reinicia el backend después de cambiar `FRONTEND_URL`

## 🔄 Actualizar el Despliegue

Cada vez que hagas push a la rama `main` de tu repositorio, Railway reconstruirá automáticamente los servicios.

Para forzar un rebuild manual:
1. Ve al servicio en Railway Dashboard
2. Haz clic en **"Deployments"**
3. Haz clic en **"Redeploy"**

## 📚 Recursos Adicionales

- [Documentación de Railway](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

