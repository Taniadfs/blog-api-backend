# Blog API Backend

API REST para la gestión de blogs y posts, desarrollada con Node.js, Express y MongoDB.

---

## Descripción

Este proyecto es una API backend que permite:

- Crear, leer, actualizar y eliminar blogs
- Crear, leer, actualizar y eliminar posts
- Relacionar posts con blogs de forma bidireccional
- Validar la existencia de recursos antes de crear relaciones
- Gestión segura de errores sin exponer información sensible

---

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework para crear el servidor y las rutas
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **dotenv** - Gestión de variables de entorno

---

## Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (local o cuenta en MongoDB Atlas)
- [Git](https://git-scm.com/)

### Pasos de instalación

1. **Clonar el repositorio:**

```bash
   git clone https://github.com/Taniadfs/blog-api-backend.git
   cd blog-api-backend
```

2. **Instalar dependencias:**

```bash
   npm install
```

3. **Configurar variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
   MONGO_URI=tu_cadena_de_conexion_mongodb
   PORT=3000
```

4. **Ejecutar la semilla (opcional):**

   Para poblar la base de datos con datos de ejemplo:

```bash
   node src/utils/seeds/seed.js
```

5. **Iniciar el servidor:**

```bash
   npm start
```

El servidor estará corriendo en `http://localhost:3000`

---

## Scripts disponibles

| Comando                        | Descripción                                         |
| ------------------------------ | --------------------------------------------------- |
| `npm start`                    | Inicia el servidor en modo producción               |
| `npm run dev`                  | Inicia el servidor en modo desarrollo (con nodemon) |
| `node src/utils/seeds/seed.js` | Ejecuta la semilla de datos                         |

---

## Endpoints de la API

### **Blogs**

| Método   | Endpoint         | Descripción                  | Body                                             | Respuesta                          |
| -------- | ---------------- | ---------------------------- | ------------------------------------------------ | ---------------------------------- |
| `GET`    | `/api/blogs`     | Obtener todos los blogs      | -                                                | Array de blogs con posts populados |
| `GET`    | `/api/blogs/:id` | Obtener un blog por ID       | -                                                | Blog con posts populados           |
| `POST`   | `/api/blogs`     | Crear un nuevo blog          | `{ nombre, descripcion, posts }`                 | Blog creado (201)                  |
| `PUT`    | `/api/blogs/:id` | Actualizar un blog           | `{ nombre, descripcion, addPosts, removePosts }` | Blog actualizado (200)             |
| `DELETE` | `/api/blogs/:id` | Eliminar un blog y sus posts | -                                                | Confirmación (200)                 |

#### Ejemplo: Crear un blog

```json
POST /api/blogs
Content-Type: application/json

{
  "nombre": "Blog de Tecnología",
  "descripcion": "Todo sobre desarrollo web y programación",
  "posts": []
}
```

#### Ejemplo: Actualizar un blog (añadir/quitar posts)

```json
PUT /api/blogs/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "nombre": "Nuevo nombre del blog",
  "addPosts": ["507f191e810c19729de860ea"],
  "removePosts": ["507f194e810c19729de860eb"]
}
```

---

### **Posts**

| Método   | Endpoint         | Descripción             | Body                                 | Respuesta                        |
| -------- | ---------------- | ----------------------- | ------------------------------------ | -------------------------------- |
| `GET`    | `/api/posts`     | Obtener todos los posts | -                                    | Array de posts con blog populado |
| `GET`    | `/api/posts/:id` | Obtener un post por ID  | -                                    | Post con blog populado           |
| `POST`   | `/api/posts`     | Crear un nuevo post     | `{ titulo, contenido, autor, blog }` | Post creado (201)                |
| `PUT`    | `/api/posts/:id` | Actualizar un post      | `{ titulo, contenido, autor }`       | Post actualizado (200)           |
| `DELETE` | `/api/posts/:id` | Eliminar un post        | -                                    | Confirmación (200)               |

#### 📝Ejemplo: Crear un post

```json
POST /api/posts
Content-Type: application/json

{
  "titulo": "Introducción a Node.js",
  "contenido": "Node.js es un entorno de ejecución para JavaScript en el servidor...",
  "autor": "Carlos García",
  "blog": "507f1f77bcf86cd799439011"
}
```

---

## Estructura del proyecto

```
blog-api-backend/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── blogsController.js    # Lógica de negocio de blogs
│   │   │   └── postsController.js    # Lógica de negocio de posts
│   │   ├── models/
│   │   │   ├── blog.js               # Modelo de Blog (Mongoose)
│   │   │   └── post.js               # Modelo de Post (Mongoose)
│   │   └── routes/
│   │       ├── blogsRoutes.js        # Rutas de blogs
│   │       └── postsRoutes.js        # Rutas de posts
│   ├── config/
│   │   └── db.js                     # Configuración de conexión a MongoDB
│   └── utils/
│       └── seeds/
│           ├── data.js               # Datos de ejemplo
│           └── seed.js               # Script de semilla
├── .env                              # Variables de entorno (no incluido en Git)
├── .gitignore                        # Archivos ignorados por Git
├── app.js                            # Configuración de Express
├── index.js                          # Punto de entrada de la aplicación
├── package.json                      # Dependencias y scripts
└── README.md                         # Documentación del proyecto
```

---

## Modelos de datos

### **Blog**

```javascript
{
  nombre: String (requerido),
  descripcion: String (requerido),
  posts: [ObjectId] (referencia a Post),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

### **Post**

```javascript
{
  titulo: String (requerido),
  contenido: String (requerido),
  autor: String (requerido),
  blog: ObjectId (requerido, referencia a Blog),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

---

## Validaciones implementadas

- **CREATE Blog:** Valida que los posts existan en la base de datos antes de crear el blog
- **PUT Blog (addPosts):** Valida que los posts a añadir existan antes de agregarlos
- **CREATE Post:** Valida que el blog exista antes de crear el post
- **DELETE Blog:** Elimina primero los posts asociados, luego el blog (evita posts huérfanos)
- **Manejo seguro de errores:** No expone información sensible del servidor

---

## Semilla de datos

La semilla de datos implementa las siguientes mejores prácticas:

1. **Creación en orden correcto:**

   - Primero crea los posts con IDs temporales
   - Luego crea los blogs usando los IDs reales de MongoDB
   - Finalmente actualiza los posts con el blog correcto

2. **Optimización:**

   - Usa un `Map` para búsquedas eficientes sin consultas repetidas a la BD
   - Evita el uso de `find()` en bucles

3. **Prevención de duplicados:**

   - Verifica si ya existen datos antes de insertar
   - Informa al usuario y no ejecuta la semilla si ya hay datos

4. **Relaciones por nombre:**
   - Usa títulos únicos en lugar de índices de arrays
   - Más robusto y fácil de mantener

### Ejecutar la semilla:

```bash
node src/utils/seeds/seed.js
```

---

## Manejo de errores

La API devuelve respuestas consistentes:

| Código | Significado           | Ejemplo                                |
| ------ | --------------------- | -------------------------------------- |
| `200`  | Operación exitosa     | Recurso obtenido/actualizado/eliminado |
| `201`  | Recurso creado        | Blog o post creado exitosamente        |
| `400`  | Error en la solicitud | Datos inválidos o faltantes            |
| `404`  | No encontrado         | Blog o post no existe                  |
| `500`  | Error del servidor    | Error interno del servidor             |

**Ejemplo de respuesta de error:**

```json
{
  "message": "Blog no encontrado"
}
```

---

## Autor

**Tania D'Angelo Fonfria**

- GitHub: [@Taniadfs](https://github.com/Taniadfs)

---

## Licencia

Este proyecto fue desarrollado como parte de un proyecto educativo.
