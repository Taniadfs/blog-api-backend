const Blog = require('../models/blog')
const Post = require('../models/post')

const createBlog = async (req, res) => {
  try {
    const postsId = req.body.posts || []

    if (postsId.length > 0) {
      const postsEncontrados = await Post.find({ _id: { $in: postsId } })

      if (postsEncontrados.length !== postsId.length) {
        return res.status(404).json({ message: 'Algunos posts no existen' })
      }
    }
    const newBlog = new Blog(req.body)
    const blogSaved = await newBlog.save()
    return res.status(201).json(blogSaved)
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el blog' })
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('posts')
    return res.status(200).json(blogs)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los blogs' })
  }
}

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('posts')
    if (!blog) {
      return res.status(404).json({ message: 'Blog no encontrado' })
    }
    return res.status(200).json(blog)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el blog' })
  }
}

const putBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { addPosts, removePosts, ...datosActualizables } = req.body

    if (addPosts && addPosts.length > 0) {
      const postsEncontrados = await Post.find({ _id: { $in: addPosts } })

      if (postsEncontrados.length !== addPosts.length) {
        return res
          .status(404)
          .json({ message: 'Algunos posts a agregar no existen' })
      }
    }

    const updateOperation = {}

    if (Object.keys(datosActualizables).length > 0) {
      updateOperation.$set = { ...datosActualizables }
    }

    if (addPosts && addPosts.length > 0) {
      updateOperation.$addToSet = {
        posts: {
          $each: addPosts
        }
      }
    }

    if (removePosts && removePosts.length > 0) {
      updateOperation.$pull = {
        posts: {
          $in: removePosts
        }
      }
    }

    if (Object.keys(updateOperation).length === 0) {
      return res.status(400).json({
        message: 'No hay datos para actualizar'
      })
    }

    const blogUpdated = await Blog.findByIdAndUpdate(id, updateOperation, {
      new: true,
      runValidators: true
    })

    if (!blogUpdated) {
      return res.status(404).json({ message: 'Blog no encontrado' })
    }

    return res.status(200).json(blogUpdated)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalido' })
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validacion' })
    }

    return res.status(500).json({ message: 'Error al actualizar el blog' })
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blogExiste = await Blog.findById(id)
    if (!blogExiste) {
      return res.status(404).json({ message: 'Blog no encontrado' })
    }
    await Post.deleteMany({ blog: id })

    const blogDeleted = await Blog.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Blog eliminado correctamente',
      blog: blogDeleted
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud' })
  }
}

module.exports = { createBlog, getAllBlogs, getBlogById, putBlog, deleteBlog }
