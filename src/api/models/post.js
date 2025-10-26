const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    autor: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post
