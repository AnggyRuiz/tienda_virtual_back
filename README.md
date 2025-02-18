# Tienda Virtual API (Backend)

Este repositorio contiene el backend de una tienda virtual desarrollado con **NestJS**, **PostgreSQL**, **TypeORM**, **JWT** para autenticación y **Swagger** para la documentación de la API.

## Requisitos

- Node.js
- PostgreSQL
- TypeORM
- JWT
- Bcryptjs
- Swagger

---

## Pasos para configurar el Backend

1. **Clona el repositorio:**
   Si aún no has clonado el repositorio, hazlo ejecutando:

   ```bash
   git clone <URL_DEL_REPOSITORIO_BACKEND>
   cd backend
2. **Instala las dependencias:**
Instala todas las dependencias necesarias para el proyecto ejecutando: npm install
3. **Configura la base de datos:**
- Crea una base de datos en PostgreSQL llamada "tienda_virtual"
4. **Arramca el Servidor**
Ejecuta el comando para arrancar el servidor: npm run start:dev
El backend se ejecutará en http://localhost:3000.
Acceder a Swagger: Puedes acceder a la documentación interactiva de la API en http://localhost:3000/api

5. **Autenticación y Autorización:**
- POST /auth/login - Inicia sesión y recibe un token JWT. Agregar el encabezado Authorization: Bearer <token> a las rutas protegida
6. **Documentación de la API:**
USUARIOS
- POST /auth/users - Registra un nuevo usuario  (requiere rol de admin)
- GET /users - Obtiene la lista de usuarios
- DELETE /users/:id - Elimina un usuario (requiere rol de admin)
- PUT /users/:id - Actualiza un usuario (requiere rol de admin)

PRODUCTOS
- POST /products - Crea un nuevo producto
- GET /products - Obtiene la lista de productos
- DELETE /products/:id - Elimina un producto