const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
)
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
