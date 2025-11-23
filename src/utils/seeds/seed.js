const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('../../api/models/blog')
const Post = require('../../api/models/post')
const { blogs, posts } = require('./data')

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')

    const existingPostsCount = await Post.countDocuments()
    const existingBlogsCount = await Blog.countDocuments()

    if (existingPostsCount > 0 || existingBlogsCount > 0) {
      console.log('La base de datos ya tiene datos.')
      console.log(`Posts existentes: ${existingPostsCount}`)
      console.log(`Blogs existentes: ${existingBlogsCount}`)
      console.log('¿Deseas limpiar la BD? Usa: await Blog.deleteMany({})')
      await mongoose.connection.close()
      return
    }
    console.log('\n Creando posts...')
    const postsCreated = await Post.insertMany(
      posts.map((post) => ({
        ...post,
        blog: new mongoose.Types.ObjectId()
      }))
    )

    console.log(`${postsCreated.length} posts creados con IDs de MongoDB`)

    const postsMap = new Map()
    postsCreated.forEach((post) => {
      postsMap.set(post.titulo, post._id)
    })

    console.log('\n📚 Creando blogs...')

    for (const blogData of blogs) {
      const postIds = blogData.postTitles
        .map((title) => postsMap.get(title))
        .filter((id) => id !== undefined)

      const blogCreated = await Blog.create({
        nombre: blogData.nombre,
        descripcion: blogData.descripcion,
        posts: postIds
      })

      await Post.updateMany(
        { _id: { $in: postIds } },
        { blog: blogCreated._id }
      )

      console.log(
        `Blog creado: "${blogCreated.nombre}" con ${postIds.length} posts`
      )
    }

    console.log('\n Semilla completada con éxito')
    await mongoose.connection.close()
  } catch (error) {
    console.error('Error en la semilla:', error)
    await mongoose.connection.close()
  }
}

seed()
