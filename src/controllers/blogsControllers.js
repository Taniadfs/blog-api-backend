const Blog = require('../api/models/blog')

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

module.exports = { createBlog, getAllBlogs, getBlogById }
