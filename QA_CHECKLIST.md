# QA Checklist - Prueba Técnica Logika

Este documento contiene las pruebas funcionales para validar el flujo completo de la aplicación (Login, Listado, Paginación y Crear Acción).

| ID | Módulo | Caso de Prueba | Paso a Paso | Resultado Esperado |
|:---|:---|:---|:---|:---|
| **01** | **Login** | Inicio de Sesión Exitoso | 1. Ingresar correo válido.<br>2. Ingresar contraseña válida.<br>3. Hacer clic en "Iniciar sesión". | El sistema redirige al Dashboard y se almacena el token de autenticación. |
| **02** | **Login** | Login con Credenciales Inválidas | 1. Ingresar correo no registrado o contraseña incorrecta.<br>2. Hacer clic en "Iniciar sesión". | El sistema muestra un mensaje de error y no permite el acceso. |
| **03** | **Login** | Validación de Campos Obligatorios | 1. Dejar campos vacíos.<br>2. Intentar hacer clic en "Iniciar sesión". | Los inputs muestran errores de validación antes de enviar la petición al backend. |
| **04** | **Dashboard** | Listado de Acciones - Carga Inicial | 1. Iniciar sesión exitosamente.<br>2. Observar la tabla de acciones. | Los datos se cargan desde la API y se visualizan correctamente en la tabla. |
| **05** | **Dashboard** | Paginación - Navegación entre páginas | 1. Ubicarse en la parte inferior de la tabla.<br>2. Hacer clic en "Siguiente" o en un número de página. | La tabla se actualiza con los registros correspondientes sin recargar el navegador. |
| **06** | **Dashboard** | Paginación - Cambio de tamaño de página | 1. Seleccionar un valor diferente en "Resultados por página" (ej: 5, 20). | La tabla muestra la cantidad seleccionada y recalcula el total de páginas. |
| **07** | **Acciones** | Abrir y Cerrar Modal de Creación | 1. Hacer clic en "Crear tipo de acción".<br>2. Hacer clic en "Cancelar" o en la "X". | El modal se abre y se cierra correctamente, limpiando el estado del formulario. |
| **08** | **Acciones** | Crear Acción con Datos Válidos | 1. Completar los campos requeridos (Nombre, Descripción, Color, Logo).<br>2. Hacer clic en "Crear". | El modal se cierra, la acción aparece en el listado y se envía la petición correctamente al backend. |
| **09** | **Acciones** | Validación de Campos Requeridos | 1. Intentar crear una acción sin adjuntar el Logo/Icono. | El sistema muestra un mensaje de error y no envía la petición. |
| **10** | **Acciones** | Selector de Color Funcional | 1. Seleccionar un color predefinido.<br>2. Ingresar un código HEX manualmente. | El color se refleja correctamente en la previsualización. |
| **11** | **Acciones** | Validación de Formato HEX | 1. Ingresar un código HEX válido (ej: `#FF5733`).<br>2. Ingresar un valor inválido (ej: `123456`, `rojo`). | El sistema solo acepta formatos HEX válidos y muestra error ante valores incorrectos. |
| **12** | **Seguridad** | Protección de Rutas | 1. Acceder directamente a `/dashboard` sin iniciar sesión. | El sistema redirige automáticamente a la pantalla de login. |
