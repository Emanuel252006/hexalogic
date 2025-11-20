# HexaLogic - Frontend React

Frontend de la aplicación HexaLogic construido con React, Vite y React Router.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

### Preview de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   └── WhatsAppButton.jsx
├── pages/           # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Servicios.jsx
│   ├── Portafolio.jsx
│   └── Contacto.jsx
├── services/        # Servicios API
│   └── api.js
├── styles/          # Estilos CSS
│   ├── base.css
│   ├── index.css
│   ├── servicios.css
│   ├── portafolio.css
│   └── contacto.css
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

En desarrollo, el proxy de Vite redirige automáticamente las peticiones `/api` al backend.

## 📦 Dependencias Principales

- **React** - Biblioteca de UI
- **React Router DOM** - Enrutamiento
- **React Icons** - Iconos
- **Vite** - Build tool y dev server

## 🔗 Backend

Asegúrate de que el backend esté corriendo en `http://localhost:3000` para que el formulario de contacto funcione correctamente.
