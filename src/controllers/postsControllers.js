const Post = require('../api/models/post')
const Blog = require('../api/models/blog')

//Post
const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const postSaved = await newPost.save()
    await Blog.findByIdAndUpdate(req.body.blog, {
      $push: { posts: postSaved._id }
    })

    return res.status(201).json(postSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { createPost }
