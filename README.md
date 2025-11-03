# Blog API Backend

API REST para gestionar blogs y posts con Node.js, Express y MongoDB.

## Descripción

Este proyecto es una API REST que permite crear, leer, actualizar y eliminar blogs y posts. Cada blog puede tener múltiples posts asociados, y cada post pertenece a un blog específico.

## Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Variables de entorno

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/blog-api-backend.git
cd blog-api-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz con las siguientes variables:

```env
MONGO_URI=tu_connection_string_de_mongodb
PORT=3000
```

4. Ejecuta el servidor:

```bash
npm run dev
```

## Seed

Para poblar la base de datos con datos de prueba:

```bash
npm run seed
```

Esto creará:

- 3 blogs (Tecnología, Viajes, Cocina)
- 6 posts (2 por cada blog)

## Endpoints

### Blogs

#### Obtener todos los blogs

```
GET /api/blogs
```

Devuelve todos los blogs con sus posts populados.

#### Obtener un blog por ID

```
GET /api/blogs/:id
```

Devuelve un blog específico con sus posts.

#### Crear un blog

```
POST /api/blogs
```

**Body:**

```json
{
  "nombre": "Nombre del blog",
  "descripcion": "Descripción del blog"
}
```

#### Actualizar un blog

```
PUT /api/blogs/:id
```

**Body:**

```json
{
  "nombre": "Nuevo nombre",
  "descripcion": "Nueva descripción"
}
```

**Nota:** El array de posts no se puede modificar desde este endpoint.

#### Eliminar un blog

```
DELETE /api/blogs/:id
```

Elimina el blog y todos sus posts asociados.

---

### Posts

#### Obtener todos los posts

```
GET /api/posts
```

Devuelve todos los posts con sus blogs populados.

#### Obtener un post por ID

```
GET /api/posts/:id
```

Devuelve un post específico con su blog.

#### Crear un post

```
POST /api/posts
```

**Body:**

```json
{
  "titulo": "Título del post",
  "contenido": "Contenido del post",
  "autor": "Nombre del autor",
  "blog": "id_del_blog"
}
```

**Nota:** Al crear un post, se actualiza automáticamente el array de posts del blog.

#### Actualizar un post

```
PUT /api/posts/:id
```

**Body:**

```json
{
  "titulo": "Nuevo título",
  "contenido": "Nuevo contenido",
  "autor": "Nuevo autor"
}
```

**Nota:** El campo `blog` no se puede modificar.

#### Eliminar un post

```
DELETE /api/posts/:id
```

Elimina el post y lo quita del array de posts del blog.

## Estructura del Proyecto

```
blog-api-backend/
├── src/
│   ├── api/
│   │   ├── models/
│   │   │   ├── blog.js
│   │   │   └── post.js
│   │   └── routes/
│   │       ├── blogsRoutes.js
│   │       └── postsRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── blogsControllers.js
│   │   └── postsControllers.js
│   └── utils/
│       └── seeds/
│           └── seed.js
├── .env
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
```

## Modelos de Datos

### Blog

```javascript
{
  nombre: String (requerido),
  descripcion: String (requerido),
  posts: [ObjectId] (referencia a Post),
  createdAt: Date,
  updatedAt: Date
}
```

### Post

```javascript
{
  titulo: String (requerido),
  contenido: String (requerido),
  autor: String (requerido),
  blog: ObjectId (referencia a Blog, requerido),
  createdAt: Date,
  updatedAt: Date
}
```

## Variables de Entorno

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-bd
PORT=3000
```

## Autor

Tania D'Angelo Fonfría

## Licencia

ISC
