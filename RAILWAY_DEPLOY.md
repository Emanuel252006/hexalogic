# Guía de Despliegue en Railway

Esta guía te ayudará a desplegar HexaLogic en Railway usando Docker con ambos servicios (frontend y backend) en la misma instancia.

## 📋 Requisitos Previos

- Cuenta en [Railway](https://railway.app)
- Repositorio en GitHub (ya lo tienes: https://github.com/Emanuel252006/hexalogic)
- Dominio personalizado: **www.hexalogic.com.co**

## 🚀 Pasos para Desplegar

### 1. Crear el Proyecto en Railway

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Haz clic en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Conecta tu repositorio `hexalogic`
5. Selecciona el repositorio y haz clic en **"Deploy Now"**
6. Railway detectará automáticamente el `Dockerfile` en la raíz del proyecto

### 2. Configurar Variables de Entorno

En la pestaña **Variables** del servicio, agrega las siguientes variables:

```
BREVO_API_KEY=tu_api_key_de_brevo
BREVO_SMTP_KEY=tu_smtp_key_de_brevo (opcional)
BREVO_SENDER_EMAIL=hexalogic20@gmail.com
BREVO_SENDER_NAME=HexaLogic
```

**Nota:** Como ambos servicios están en la misma instancia, NO necesitas configurar `FRONTEND_URL` ni `VITE_API_URL`. El frontend usa rutas relativas (`/api`) que nginx redirige automáticamente al backend.

### 3. Configurar el Dominio Personalizado

1. En la pestaña **Settings** del servicio
2. Ve a la sección **"Networking"** o **"Custom Domain"**
3. Haz clic en **"Custom Domain"** o **"Add Domain"**
4. Ingresa tu dominio: `www.hexalogic.com.co`
5. Railway te mostrará los registros DNS que debes configurar en tu proveedor de dominio

#### Configuración DNS

En tu proveedor de dominio (donde compraste hexalogic.com.co), configura:

**Tipo CNAME:**
- **Nombre/Host:** `www`
- **Valor/Destino:** El valor que Railway te proporciona (algo como `xxxxx.railway.app`)

O si prefieres usar un registro A:
- **Tipo:** A
- **Nombre/Host:** `www`
- **Valor/Destino:** La IP que Railway te proporciona

**Nota:** Railway te dará las instrucciones exactas después de agregar el dominio.

### 4. Verificar el Despliegue

Una vez configurado el dominio y completado el deployment:

1. Visita `https://www.hexalogic.com.co` - Deberías ver el frontend
2. Visita `https://www.hexalogic.com.co/api/health` - Deberías ver `{"status":"ok","message":"Backend is running"}`

## 🏗️ Arquitectura del Despliegue

Este proyecto usa una **arquitectura monolítica** en un solo contenedor:

```
┌─────────────────────────────────────┐
│         Contenedor Docker           │
│                                     │
│  ┌─────────────┐  ┌──────────────┐ │
│  │   Nginx      │  │   Backend    │ │
│  │  (Puerto 80) │  │ (Puerto 3000)│ │
│  └──────┬───────┘  └──────┬───────┘ │
│         │                 │         │
│         └────────┬────────┘         │
│                  │                  │
│         ┌────────▼────────┐        │
│         │   Frontend       │        │
│         │  (Archivos       │        │
│         │   Estáticos)     │        │
│         └─────────────────┘        │
└─────────────────────────────────────┘
```

**Flujo de peticiones:**
- Peticiones a `/` → Nginx sirve el frontend estático
- Peticiones a `/api/*` → Nginx hace proxy al backend en `localhost:3000`

## 📝 Variables de Entorno Requeridas

| Variable | Descripción | Requerida | Valor de Ejemplo |
|----------|-------------|-----------|------------------|
| `BREVO_API_KEY` | API Key de Brevo para envío de correos | Sí | `xkeysib-...` |
| `BREVO_SMTP_KEY` | SMTP Key de Brevo (opcional, fallback) | No | `...` |
| `BREVO_SENDER_EMAIL` | Email remitente | Sí | `hexalogic20@gmail.com` |
| `BREVO_SENDER_NAME` | Nombre del remitente | No | `HexaLogic` |

**Variables NO necesarias:**
- ❌ `PORT` - Railway lo asigna automáticamente
- ❌ `FRONTEND_URL` - No necesario (mismo dominio)
- ❌ `VITE_API_URL` - No necesario (rutas relativas)
- ❌ `NODE_ENV` - Se maneja automáticamente

## 🐛 Solución de Problemas

### El deployment falla durante el build

- Verifica que el `Dockerfile` esté en la raíz del proyecto
- Revisa los logs en Railway Dashboard → Service → Deployments → Logs
- Asegúrate de que todos los archivos necesarios estén en el repositorio

### El sitio no carga después del deployment

- Verifica que el dominio esté correctamente configurado en Railway
- Revisa los registros DNS en tu proveedor de dominio
- Espera unos minutos para que los cambios DNS se propaguen (puede tardar hasta 48 horas, pero usualmente es más rápido)

### El formulario de contacto no funciona

- Verifica que `BREVO_API_KEY` esté configurada correctamente
- Revisa los logs del backend en Railway Dashboard
- Verifica que el email remitente esté verificado en Brevo

### Error 502 Bad Gateway

- El backend puede no estar iniciado correctamente
- Revisa los logs del servicio en Railway
- Verifica que el backend esté escuchando en el puerto 3000

### Error de CORS

- Con la configuración actual, CORS está configurado para permitir cualquier origen
- Si persiste el error, verifica los logs del backend

## 🔄 Actualizar el Despliegue

Cada vez que hagas push a la rama `main` de tu repositorio, Railway reconstruirá automáticamente el servicio.

Para forzar un rebuild manual:
1. Ve al servicio en Railway Dashboard
2. Haz clic en **"Deployments"**
3. Haz clic en **"Redeploy"**

## 📚 Recursos Adicionales

- [Documentación de Railway](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Configurar Dominios en Railway](https://docs.railway.app/deploy/custom-domains)

## 🔐 Seguridad

- Las variables de entorno sensibles (como `BREVO_API_KEY`) nunca se exponen en el código
- Railway encripta las variables de entorno automáticamente
- El backend solo acepta conexiones desde nginx (localhost)
- HTTPS está habilitado automáticamente por Railway para dominios personalizados
