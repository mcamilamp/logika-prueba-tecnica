# Prueba Técnica Logika - Be Kind

Este repositorio contiene la solución a la prueba técnica para el cargo de Desarrollador Frontend. La aplicación consiste en un sistema de gestión de acciones/categorías con autenticación segura y visualización de datos en tiempo real.

## Configuración del Proyecto

1. **Instalar dependencias:** `npm install`
2. **Archivo .env:** Crear un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   VITE_API_AUTH_URL=https://dev.apinetbo.bekindnetwork.com/api/Authentication
   VITE_API_URL_DASHBOARD=https://dev.api.bekindnetwork.com/api/v1
   ```
3. **Iniciar app:** `npm run dev`

## Decisiones Técnicas y Justificaciones

### Arquitectura y Estilos (Sass)

Se eligió **Sass (SCSS)** por su capacidad para crear estilos escalables y mantenibles. El uso de **mixins** y **variables** permitió centralizar la identidad visual (colores y tipografías) y reutilizar patrones de diseño recurrentes, reduciendo la duplicación de código y facilitando el mantenimiento global.

### Seguridad y Configuración (.env)

Se implementó un archivo **.env** para gestionar los endpoints de las APIs de forma segura. Esta práctica evita la exposición de infraestructura sensible y cumple con los estándares de arquitectura de software para el manejo de múltiples entornos.

### Manejo de Formularios y Validación

- **Librerías:** React Hook Form y Zod.
- **Decisión:** Utilizar un esquema de validación basado en objetos.
- **Razón:** Para el Login, `Zod` permite definir reglas claras (como formato de email y longitud de password) que se validan antes de disparar la petición a la red, mejorando la UX al dar feedback instantáneo al usuario y evitando peticiones innecesarias al servidor.

### Consumo de APIs y Formularios

- **Axios:** Seleccionado por su facilidad para manejar `FormData` y headers de autorización.
- **React Hook Form / Zod:** Utilizados para garantizar validaciones eficientes y una UX fluida mediante feedback instantáneo antes de disparar peticiones.

## Supuestos y Hallazgos Técnicos (Inferencia de API)

Durante el desarrollo, al no contar con una documentación exhaustiva del payload de creación, se tomaron los siguientes supuestos basados en la observación de los datos:

1.  **Manejo de Archivos:** Se determinó el uso de `FormData` para el endpoint `/admin-add` al identificar la necesidad de subir una imagen para el ícono.
2.  **Estado del Registro:** Se infirió que el servidor espera valores numéricos (`'1'` para activo, `'0'` para inactivo) para el campo de estado.
3.  **Extracción de Token:** Se implementó lógica defensiva para extraer el JWT, ya que el API puede retornarlo como string plano o dentro de un objeto.
4.  **Multi-dominio:** Se configuró el manejo de headers para interactuar correctamente con dos subdominios distintos (`apinetbo` y `api`).
