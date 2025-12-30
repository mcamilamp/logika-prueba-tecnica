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

### 1. Arquitectura de Estilos: Sass (SCSS) con Mixins
- **Decisión:** Utilicé Sass sobre CSS puro o Tailwind.
- **Razón:** Sass permite una arquitectura de estilos escalable y mantenible, separando responsabilidades mediante variables, mixins y archivos parciales.
Utilicé para centralizar la paleta de colores, tipografías y breakpoints, garantizando consistencia visual en toda la aplicación.
Los mixins facilitaron la reutilización de patrones de diseño recurrentes (layout, efectos visuales y responsive), reduciendo duplicación de código y mejorando la mantenibilidad.
Se priorizó Sass sobre CSS puro y Tailwind por ofrecer mayor control sobre el diseño y alinearse mejor con la estructura del proyecto.

### 2. Seguridad y Configuración: Variables de Entorno (.env)
- **Decisión:** Implementación de un archivo `.env` para almacenar las URLs de las APIs.
- **Razón:** Es una **buena práctica de seguridad** y arquitectura. Separar los endpoints del código fuente evita la exposición de infraestructuras sensibles y permite que la aplicación sea fácilmente desplegable en diferentes entornos (Desarrollo, QA, Producción) simplemente cambiando el archivo de configuración.

### 3. Manejo de Formularios y Validación
- **Librerías:** React Hook Form y Zod.
- **Decisión:** Utilizar un esquema de validación basado en objetos.
- **Razón:** Para el Login, `Zod` permite definir reglas claras (como formato de email y longitud de password) que se validan antes de disparar la petición a la red, mejorando la UX al dar feedback instantáneo al usuario y evitando peticiones innecesarias al servidor.

### 4. Consumo de Datos: Axios
- **Decisión:** Uso de Axios en lugar de Fetch API.
- **Razón:** Axios maneja de forma más intuitiva las peticiones que requieren el envío de archivos (`FormData`) y la inclusión de headers de autorización (`Bearer Token`). Además, su robusto sistema de manejo de errores permite capturar respuestas del servidor (como el 400 Bad Request) de manera más sencilla para el debugging.

### 5. Interfaz Visual: React Icons
- **Razón:** Proporciona un conjunto de iconos consistente y ligero que mejora significativamente la navegación y la jerarquía visual de la tabla y los controles de paginación.

## Supuestos y Hallazgos Técnicos (Inferencia de API)

Durante el desarrollo, al no contar con una documentación exhaustiva del payload de creación, se tomaron los siguientes supuestos basados en la observación de los datos:

1.  **Payload de Creación (Multipart/FormData):** Se identificó que para incluir el logo de la categoría/acción, el endpoint `/admin-add` debía recibir un objeto `FormData`. Esto es una deducción basada en el campo "Icon" presente en el listado.
2.  **Mapeo de Estado:** Se descubrió que el API no acepta strings como "Active" en el envío del formulario. Se asumió y verificó que el servidor espera valores numéricos (`'1'` para Activo, `'0'` para Inactivo).
3.  **Esquema de Token:** El Login puede devolver el token como un string plano o un objeto anidado dependiendo del escenario; el código se implementó con lógica defensiva para extraer el JWT de ambas formas.
4.  **Diferencia de Dominios:** Se manejó explícitamente la comunicación con dos subdominios distintos (`apinetbo` para Auth y `api` para Dashboard), asegurando que los headers de CORS y autorización fueran correctos para cada uno.


