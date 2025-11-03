const Blog = require('../api/models/blog')
const Post = require('../api/models/post')

const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body)
    const blogSaved = await newBlog.save()
    return res.status(201).json(blogSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('posts')
    return res.status(200).json(blogs)
  } catch (error) {
    return res.status(400).json(error)
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
    return res.status(400).json(error)
  }
}

const putBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { posts, ...datosActualizables } = req.body

    const blogUpdated = await Blog.findByIdAndUpdate(id, datosActualizables, {
      new: true
    }).populate('posts')

    if (!blogUpdated) {
      return res.status(404).json({ message: 'Blog no encontrado' })
    }

    return res.status(200).json(blogUpdated)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error en la solicitud', error: error.message })
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blogDeleted = await Blog.findByIdAndDelete(id)
    if (!blogDeleted) {
      return res.status(404).json({ message: 'Blog no encontrado' })
    }

    await Post.deleteMany({ blog: id })

    return res.status(200).json({
      message: 'Blog eliminado correctamente',
      blog: blogDeleted
    })
  } catch (error) {
    return res.status(500).json('Error en la solicitud')
  }
}

module.exports = { createBlog, getAllBlogs, getBlogById, putBlog, deleteBlog }
