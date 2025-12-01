const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('../../api/models/blog')
const Post = require('../../api/models/post')
const { seedData } = require('./data')

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Conectado a MongoDB')

    // Verificar si ya hay datos
    const existingPostsCount = await Post.countDocuments()
    const existingBlogsCount = await Blog.countDocuments()

    if (existingPostsCount > 0 || existingBlogsCount > 0) {
      console.log('\n  La base de datos ya tiene datos.')
      console.log(`   Posts existentes: ${existingPostsCount}`)
      console.log(`   Blogs existentes: ${existingBlogsCount}`)
      console.log('\n Para limpiar la BD, ejecuta:')
      console.log('   await Blog.deleteMany({})')
      console.log('   await Post.deleteMany({})')
      await mongoose.connection.close()
      return
    }

    console.log('\n Iniciando semilla...\n')

    for (const data of seedData) {
      const blogCreated = await Blog.create({
        nombre: data.blog.nombre,
        descripcion: data.blog.descripcion,
        posts: []
      })

      const postsCreated = await Post.insertMany(
        data.posts.map((post) => ({
          titulo: post.titulo,
          contenido: post.contenido,
          autor: post.autor,
          blog: blogCreated._id
        }))
      )

      blogCreated.posts = postsCreated.map((p) => p._id)
      await blogCreated.save()

      console.log(
        ` Blog creado: "${blogCreated.nombre}" con ${postsCreated.length} posts`
      )
    }

    console.log('\n🎉 Semilla completada con éxito\n')
    await mongoose.connection.close()
  } catch (error) {
    console.error(' Error en la semilla:', error)
    await mongoose.connection.close()
  }
}

seed()
