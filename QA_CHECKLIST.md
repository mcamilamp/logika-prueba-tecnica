# QA Checklist - Prueba Técnica Logika

Este documento contiene las pruebas funcionales para validar el flujo completo de la aplicación (Login, Listado, Paginación y Crear Acción).

| ID | Módulo | Caso de Prueba | Paso a Paso | Resultado Esperado |
|:---|:---|:---|:---|:---|
| **01** | **Login** | Inicio de Sesión Exitoso | 1. Ingresar correo válido.<br>2. Ingresar contraseña válida.<br>3. Hacer clic en "Iniciar sesión". | El sistema redirige al Dashboard y se almacena el token de autenticación. |
| **02** | **Login** | Login con Credenciales Inválidas | 1. Ingresar correo no registrado o contraseña incorrecta.<br>2. Hacer clic en "Iniciar sesión". | El sistema muestra un mensaje de error y no permite el acceso. |
| **03** | **Login** | Validación de Campos Obligatorios | 1. Dejar campos vacíos.<br>2. Intentar hacer clic en "Iniciar sesión". | Los inputs muestran errores de validación (HTML5 o react-hook-form) antes de enviar la petición. |
| **04** | **Dashboard** | Listado de Acciones - Carga Inicial | 1. Iniciar sesión exitosamente.<br>2. Observar la tabla de acciones. | Los datos se cargan desde la API y se visualizan correctamente en la tabla. |
| **05** | **Dashboard** | Paginación - Navegación entre páginas | 1. Ubicarse en la parte inferior de la tabla.<br>2. Hacer clic en la flecha "Siguiente" o en el número de página. | La tabla se actualiza con los registros correspondientes a la nueva página sin recargar el navegador. |
| **06** | **Dashboard** | Paginación - Cambio de tamaño (Rows per page) | 1. Seleccionar un valor diferente en el dropdown de "Resultados por página" (ej: 5, 20). | La tabla muestra la cantidad de registros seleccionada y recalcula el número total de páginas. |
| **07** | **Acciones** | Abrir/Cerrar Modal de Creación | 1. Hacer clic en el botón "Crear tipo de acción".<br>2. Hacer clic en la "X" o en el botón "Cancelar". | El modal se abre y se cierra correctamente limpiando el estado si es necesario. |
| **08** | **Acciones** | Crear Acción con Datos Válidos | 1. Completar todos los campos (Nombre, Descripción, Color, Logo).<br>2. Hacer clic en "Crear". | El modal se cierra, se muestra la nueva acción en el listado y se envía la petición Multipart/FormData al backend. |
| **09** | **Acciones** | Validación de Campos en Creación | 1. Intentar guardar una acción sin adjuntar el Logo/Icono. | El sistema muestra un mensaje de error "El logo es obligatorio" y no envía la petición. |
| **10** | **Acciones** | Selector de Color Funcional | 1. Elegir un color de los preajustes (presets).<br>2. Escribir un código HEX manualmente. | El cuadro de previsualización del color se actualiza según la selección o el texto ingresado. |
| **11** | **General** | Validación de Código HEX | 1. Ingresar un código HEX válido (ej: #FF5733).<br>2. Ingresar un código HEX inválido (ej: 123456, #ZZZZZZ). | El sistema acepta únicamente códigos HEX válidos, muestra error de validación ante valores inválidos y no permite continuar. |
| **12** | **Seguridad** | Acceso Protegido (ProtectedRoute) | 1. Cerrar el navegador.<br>2. Intentar ingresar directamente a `/dashboard` sin haber iniciado sesión. | El sistema redirige automáticamente a la página de `/login`. |
