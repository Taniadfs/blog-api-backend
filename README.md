Proyecto API BACKEND
Blog API Backend
API REST para gestionar blogs y posts con Node.js, Express y MongoDB.

Descripción
Este proyecto es una API REST que permite crear, leer, actualizar y eliminar blogs y posts. Cada blog puede tener múltiples posts asociados, y cada post pertenece a un blog específico.

Tecnologías
Node.js - Entorno de ejecución
Express - Framework web
MongoDB - Base de datos NoSQL
Mongoose - ODM para MongoDB
dotenv - Variables de entorno
Instalación
Clona el repositorio:
git clone https://github.com/Taniadfs/blog-api-backend.git
cd blog-api-backend
Instala las dependencias:
npm install
Crea un archivo .env en la raíz con las siguientes variables:
MONGO_URI=tu_connection_string_de_mongodb
PORT=3000
Ejecuta el servidor:
npm run dev
Seed
Para poblar la base de datos con datos de prueba:

npm run seed
Esto creará:

3 blogs (Tecnología, Viajes, Cocina)
6 posts (2 por cada blog)
Endpoints
Blogs
Método Endpoint Descripción Body (JSON)
GET /api/blogs Obtener todos los blogs -
GET /api/blogs/:id Obtener un blog por ID -
POST /api/blogs Crear un nuevo blog { "nombre": "string", "descripcion": "string" }
PUT /api/blogs/:id Actualizar un blog { "nombre": "string", "descripcion": "string" }
DELETE /api/blogs/:id Eliminar un blog y sus posts -
Notas:

Al actualizar un blog, el array de posts no se puede modificar desde este endpoint
Al eliminar un blog, se eliminan también todos sus posts asociados
Posts
Método Endpoint Descripción Body (JSON)
GET /api/posts Obtener todos los posts -
GET /api/posts/:id Obtener un post por ID -
POST /api/posts Crear un nuevo post { "titulo": "string", "contenido": "string", "autor": "string", "blog": "id" }
PUT /api/posts/:id Actualizar un post { "titulo": "string", "contenido": "string", "autor": "string" }
DELETE /api/posts/:id Eliminar un post -
Notas:

Al crear un post, se actualiza automáticamente el array de posts del blog usando $addToSet (evita duplicados)
Al actualizar un post, el campo blog no se puede modificar
Al eliminar un post, se quita del array de posts del blog usando $pull
️ Estructura del Proyecto
blog-api-backend/
├── src/
│ ├── api/
│ │ ├── models/
│ │ │ ├── blog.js
│ │ │ └── post.js
│ │ └── routes/
│ │ ├── blogsRoutes.js
│ │ └── postsRoutes.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── blogsControllers.js
│ │ └── postsControllers.js
│ └── utils/
│ └── seeds/
│ ├── data.js
│ └── seed.js
├── .env
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
Modelos de Datos
Blog
{
nombre: String (requerido),
descripcion: String (requerido),
posts: [ObjectId] (referencia a Post),
createdAt: Date,
updatedAt: Date
}
Post
{
titulo: String (requerido),
contenido: String (requerido),
autor: String (requerido),
blog: ObjectId (referencia a Blog, requerido),
createdAt: Date,
updatedAt: Date
}
Variables de Entorno
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-bd
PORT=3000
Autor
Tania D’Angelo Fonfría

Licencia
ISC
