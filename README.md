# Prueba Técnica Logika

Este proyecto es una aplicación web desarrollada en **React 18** utilizando **TypeScript** y **Vite**. El objetivo principal es gestionar un listado de acciones/categorías, permitiendo la visualización paginada y la creación de nuevas entradas a través de una API REST.

## Tecnologías Utilizadas

- **React 18 (Vite):** Para una experiencia de desarrollo rápida y una estructura de componentes eficiente.
- **TypeScript:** Para asegurar un tipado fuerte y reducir errores en tiempo de ejecución.
- **Sass (SCSS):** Elegí Sass por su flexibilidad, capacidad de anidamiento y uso de variables, lo que permite mantener una UI limpia y escalable.
- **Axios:** Para el manejo de peticiones HTTP, aprovechando su facilidad para interceptores y manejo de archivos.
- **React Router DOM v7:** Manejo de rutas y protección de las mismas.
- **React Icons:** Para una interfaz visual más intuitiva con iconos modernos (Lucide/Feather).

## Buenas Prácticas y Arquitectura

- **AuthContext:** Sistema de autenticación centralizado que maneja el estado del token y la persistencia en `localStorage`.
- **Protected Routes:** Implementación de rutas privadas para asegurar que solo usuarios autenticados accedan al Dashboard.
- **Service Layer:** Separación de la lógica de negocio (peticiones API) en una capa de servicios independiente.
- **Variables de Entorno:** Configuración de endpoints dinámica y segura.

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio.**
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar el entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
   ```env
   VITE_API_AUTH_URL=https://dev.apinetbo.bekindnetwork.com/api/Authentication
   VITE_API_URL_DASHBOARD=https://dev.api.bekindnetwork.com/api/v1
   ```
4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Inferencia de la API (Retos Técnicos)

Como parte de la prueba, se identificó y resolvió lo siguiente:
- **CORS & Headers:** Manejo de autenticación Bearer Token y configuración de encabezados para consumos en múltiples subdominios.
- **Manejo de Archivos (Upload):** El endpoint de creación (`admin-add`) requiere el envío de datos mediante `FormData` para procesar la imagen del ícono.
- **Mapeo de Estados:** Se infirió que el campo `status` en la creación debe enviarse como `'1'` (Active) o `'0'` (Inactive) para que el servidor lo procese correctamente.
- **UI Responsiva:** Se implementó una tabla con scroll horizontal y un modal adaptativo basado en el diseño sugerido de Figma.

