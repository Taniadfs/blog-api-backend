const Post = require('../models/post')
const Blog = require('../models/blog')
const { get } = require('mongoose')

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const postSaved = await newPost.save()
    await Blog.findByIdAndUpdate(req.body.blog, {
      $addToSet: { posts: postSaved._id }
    })

    return res.status(201).json(postSaved)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al crear el post', error: error.message })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('blog')
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(400).json(error)
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
    return res.status(400).json(error)
  }
}

const putPost = async (req, res) => {
  try {
    const { id } = req.params
    const { blog, ...datosActualizados } = await req.body

    const postUpdated = await Post.findByIdAndUpdate(id, datosActualizados, {
      new: true
    }).populate('blog')

    if (!postUpdated) {
      return res.status(404).json({ message: 'Post no encontrado' })
    }

    return res.status(200).json(postUpdated)
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud' })
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
