const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('../../api/models/blog')
const Post = require('../../api/models/post')

const blogs = [
  {
    nombre: 'Blog de Tecnología',
    descripcion: 'Todo sobre las últimas tecnologías'
  },
  {
    nombre: 'Blog de Viajes',
    descripcion: 'Aventuras alrededor del mundo'
  },
  {
    nombre: 'Blog de Cocina',
    descripcion: 'Recetas deliciosas y fáciles'
  }
]

const posts = [
  {
    titulo: 'Introducción a Node.js',
    contenido: 'Node.js es un entorno de ejecución para JavaScript...',
    autor: 'Carlos García'
  },
  {
    titulo: 'React vs Vue',
    contenido: 'Comparativa entre los dos frameworks más populares...',
    autor: 'Ana Martínez'
  },
  {
    titulo: 'Mi viaje a Japón',
    contenido: 'Tokio, Kyoto y más aventuras en el país del sol naciente...',
    autor: 'Laura Kaminski'
  },
  {
    titulo: 'Playas de Tailandia',
    contenido: 'Las mejores playas del sudeste asiático...',
    autor: 'Maya Sánchez'
  },

  {
    titulo: 'Pasta Carbonara Auténtica',
    contenido: 'La receta tradicional italiana paso a paso...',
    autor: 'María Rossi'
  },
  {
    titulo: 'Postres sin azúcar',
    contenido: 'Deliciosas opciones saludables...',
    autor: 'José Fernández'
  }
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')

    await Blog.deleteMany({})
    await Post.deleteMany({})
    console.log('Base de datos limpiada')

    const blogsCreated = await Blog.insertMany(blogs)
    console.log(`${blogsCreated.length} blogs creados`)

    const postsWithBlog = [
      { ...posts[0], blog: blogsCreated[0]._id },
      { ...posts[1], blog: blogsCreated[0]._id },
      { ...posts[2], blog: blogsCreated[1]._id },
      { ...posts[3], blog: blogsCreated[1]._id },
      { ...posts[4], blog: blogsCreated[2]._id },
      { ...posts[5], blog: blogsCreated[2]._id }
    ]
    const postsCreated = await Post.insertMany(postsWithBlog)
    console.log(`${postsCreated.length} posts creados`)

    for (let i = 0; i < blogsCreated.length; i++) {
      const blogPosts = postsCreated.filter(
        (post) => post.blog.toString() === blogsCreated[i]._id.toString()
      )
      await Blog.findByIdAndUpdate(blogsCreated[i]._id, {
        posts: blogPosts.map((p) => p._id)
      })
    }
    console.log('Blogs actualizados con sus posts')

    console.log('Seed completado exitosamente')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error en el seed:', error)
    mongoose.connection.close()
  }
}

seed()
