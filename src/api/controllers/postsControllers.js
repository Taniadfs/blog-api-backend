const Post = require('../models/post')
const Blog = require('../models/blog')

const createPost = async (req, res) => {
  try {
    const blogExiste = await Blog.findById(req.body.blog)
    if (!blogExiste) {
      return res.status(404).json({ message: 'El blog no existe' })
    }
    const newPost = new Post(req.body)
    const postSaved = await newPost.save()
    await Blog.findByIdAndUpdate(req.body.blog, {
      $addToSet: { posts: postSaved._id }
    })

    return res.status(201).json(postSaved)
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el post' })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('blog')
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los posts' })
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('blog')

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el post' })
  }
}

const putPost = async (req, res) => {
  try {
    const { id } = req.params
    const { blogId, ...datosActualizados } = req.body

    const postActual = await Post.findById(id)

    if (!postActual) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }

    if (blogId) {
      const blogExiste = await Blog.findById(blogId)
      if (!blogExiste) {
        return res.status(404).json({ message: 'El blog indicado no existe' })
      }
      const blogIdAnterior = postActual.blog.toString()
      if (blogIdAnterior !== blogId) {
        await Blog.findByIdAndUpdate(blogIdAnterior, {
          $pull: { posts: postActual._id }
        })
        await Blog.findByIdAndUpdate(blogId, {
          $addToSet: { posts: postActual._id }
        })
      }
      datosActualizados.blog = blogId
    }

    const postUpdated = await Post.findByIdAndUpdate(id, datosActualizados, {
      new: true,
      runValidators: true
    }).populate('blog')

    return res.status(200).json(postUpdated)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalido' })
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validacion' })
    }
    return res.status(500).json({ message: 'Error al actualizar el post' })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const postDeleted = await Post.findByIdAndDelete(id)
    if (!postDeleted) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }

    await Blog.findByIdAndUpdate(postDeleted.blog, {
      $pull: { posts: postDeleted._id }
    })

    return res
      .status(200)
      .json({ message: 'post eliminado correctamente', postDeleted })
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud' })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  putPost,
  deletePost
}
