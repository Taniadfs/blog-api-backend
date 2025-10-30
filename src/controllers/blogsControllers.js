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

module.exports = { createBlog }
