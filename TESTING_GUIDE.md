# Guía de Pruebas - Chat en Línea

## Estado del Servidor
✅ El servidor está corriendo en `http://localhost:3001`

## Pasos para Probar la Aplicación

### 1. Acceder a la Aplicación
Abre tu navegador y ve a: `http://localhost:3001`

### 2. Prueba de Login
- Deberías ver la página de bienvenida con un formulario
- Ingresa un nombre (mínimo 2 caracteres, máximo 20)
- Haz clic en "Ingresar"
- El nombre se guardará en sessionStorage

### 3. Prueba de Selección de Salas
- Después del login, verás 5 salas disponibles:
  - 💬 General
  - 💻 Tecnología
  - ⚽ Deportes
  - 🎵 Música
  - 🎲 Random
- Haz clic en cualquier sala para entrar

### 4. Prueba de Chat en Tiempo Real
Para probar completamente, abre **múltiples pestañas** del navegador:

#### Pestaña 1:
1. Ingresa con nombre "Usuario1"
2. Entra a la sala "General"
3. Observa el mensaje de sistema: "👋 Usuario1 se ha unido a la sala"

#### Pestaña 2:
1. Ingresa con nombre "Usuario2"
2. Entra a la misma sala "General"
3. En ambas pestañas deberías ver: "👋 Usuario2 se ha unido a la sala"
4. El contador de usuarios debería mostrar "2"

#### Enviar Mensajes:
1. En Pestaña 1, escribe un mensaje y envía
2. El mensaje debería aparecer:
   - En Pestaña 1: Lado derecho (morado) - mensaje propio
   - En Pestaña 2: Lado izquierdo (blanco) - mensaje de otro usuario
3. Cada mensaje muestra: nombre de usuario y hora de envío

### 5. Prueba de Salir de Sala
- Haz clic en "Salir de la Sala"
- Deberías regresar a la selección de salas
- En las otras pestañas debería aparecer: "👋 [Usuario] ha salido de la sala"
- El contador de usuarios debería decrementar

### 6. Prueba de Cerrar Sesión
- Haz clic en "Cerrar Sesión"
- El nombre se eliminará de sessionStorage
- Deberías regresar a la página de login
- En las otras pestañas debería aparecer la notificación de salida

### 7. Prueba de Persistencia de Sesión
- Inicia sesión con un nombre
- Refresca la página (F5)
- Deberías seguir en la misma página (no regresar al login)
- Cierra la pestaña/ventana completamente
- Abre una nueva pestaña y ve a `http://localhost:3001`
- Deberías ver la página de login (sesión eliminada)

### 8. Prueba de Múltiples Salas
- Abre 3 pestañas
- En Pestaña 1: Usuario1 → Sala "General"
- En Pestaña 2: Usuario2 → Sala "Tecnología"
- En Pestaña 3: Usuario3 → Sala "General"
- Usuario1 y Usuario3 deberían verse entre sí
- Usuario2 no debería ver mensajes de Usuario1 ni Usuario3

## Características a Verificar

### ✅ Funcionalidades Implementadas
- [x] Login con nombre de usuario
- [x] Validación de nombre (2-20 caracteres)
- [x] Persistencia en sessionStorage
- [x] Selección de múltiples salas
- [x] Ingreso a sala con notificación
- [x] Envío de mensajes en tiempo real
- [x] Recepción de mensajes en tiempo real
- [x] Distinción visual (propios vs otros)
- [x] Nombre de usuario en mensajes
- [x] Marca de tiempo en mensajes
- [x] Notificación de salida de usuario
- [x] Contador de usuarios en línea
- [x] Botón "Salir de la Sala"
- [x] Botón "Cerrar Sesión"
- [x] Diseño responsive
- [x] Manejo de desconexiones

## Problemas Conocidos
Ninguno detectado hasta el momento.

## Comandos Útiles

### Detener el servidor
En la terminal donde corre el servidor, presiona `Ctrl + C`

### Reiniciar el servidor
```bash
cd typescript
npm run dev
```

### Ver logs del servidor
Los logs aparecen en la terminal donde ejecutaste `npm run dev`

## Notas Adicionales

- Los mensajes NO se guardan en base de datos (no hay historial)
- Al refrescar la página del chat, los mensajes anteriores desaparecen
- El sessionStorage es específico de cada pestaña/ventana
- Socket.IO maneja automáticamente las reconexiones

## Capturas de Pantalla Sugeridas

1. Página de login
2. Selección de salas
3. Chat con múltiples usuarios
4. Mensajes propios vs otros
5. Notificaciones de entrada/salida

---

**Fecha de Prueba**: Enero 2025
**Versión**: 1.0.0
**Estado**: ✅ Todas las funcionalidades implementadas y funcionando
