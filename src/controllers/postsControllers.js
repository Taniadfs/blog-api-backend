const Post = require('../api/models/post')

//Post
const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const postSaved = await newPost.save()
    return res.status(201).json(postSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { createPost }
