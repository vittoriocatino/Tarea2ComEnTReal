# Chat en Línea - Aplicación Web

Una aplicación de chat en tiempo real construida con TypeScript, Express, Socket.IO y Handlebars.

## Características

- ✅ Autenticación basada en nombre de usuario
- ✅ Persistencia de sesión (sessionStorage)
- ✅ Múltiples salas de chat
- ✅ Mensajería en tiempo real
- ✅ Notificaciones de entrada/salida de usuarios
- ✅ Distinción visual entre mensajes propios y ajenos
- ✅ Contador de usuarios en línea
- ✅ Marca de tiempo en mensajes
- ✅ Función de cerrar sesión
- ✅ Diseño responsive

## Requisitos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Navegar al directorio del proyecto:
```bash
cd typescript
```

2. Instalar dependencias:
```bash
npm install
```

## Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm run build
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
typescript/
├── src/
│   ├── index.ts                 # Servidor principal y Socket.IO
│   ├── app/
│   │   ├── routes.ts           # Rutas principales
│   │   ├── chat/
│   │   │   ├── controller.ts   # Controladores de chat
│   │   │   └── routes.ts       # Rutas de chat
│   │   ├── auth/               # Autenticación (existente)
│   │   └── users/              # Usuarios (existente)
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars # Layout principal
│       ├── login.handlebars    # Página de login
│       ├── rooms.handlebars    # Selección de salas
│       └── chat.handlebars     # Interfaz de chat
├── public/
│   ├── js/
│   │   ├── login.js           # Lógica de login
│   │   ├── rooms.js           # Lógica de salas
│   │   └── chat.js            # Lógica de chat
│   └── styles/
│       └── estilos.css        # Estilos CSS
└── package.json
```

## Uso

### 1. Inicio de Sesión
- Ingresa tu nombre (2-20 caracteres)
- El nombre se guarda en sessionStorage
- Persiste al refrescar la página
- Se elimina al cerrar la ventana/pestaña

### 2. Selección de Sala
- Elige entre 5 salas disponibles:
  - 💬 General
  - 💻 Tecnología
  - ⚽ Deportes
  - 🎵 Música
  - 🎲 Random

### 3. Chat
- Envía mensajes en tiempo real
- Ve quién está en línea
- Recibe notificaciones cuando usuarios entran/salen
- Tus mensajes aparecen en morado (derecha)
- Mensajes de otros aparecen en blanco (izquierda)

### 4. Navegación
- **Salir de la Sala**: Regresa a la selección de salas
- **Cerrar Sesión**: Elimina tu nombre y regresa al login

## Tecnologías Utilizadas

- **Backend**:
  - TypeScript
  - Express.js
  - Socket.IO
  - Express Handlebars

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Socket.IO Client

## Eventos Socket.IO

### Cliente → Servidor
- `join-room`: Usuario se une a una sala
- `send-message`: Usuario envía un mensaje
- `leave-room`: Usuario sale de una sala

### Servidor → Cliente
- `user-joined`: Notifica que un usuario se unió
- `user-left`: Notifica que un usuario salió
- `new-message`: Nuevo mensaje en la sala
- `room-users`: Lista actualizada de usuarios

## Características de Seguridad

- Validación de entrada de usuario
- Escape de HTML en mensajes
- Límites de longitud de nombre de usuario
- Manejo de desconexiones

## Autor

Desarrollado como proyecto académico para ITESO 2025
