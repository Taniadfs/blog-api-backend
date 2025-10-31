const express = require('express')
const router = express.Router()
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  putBlog,
  deleteBlog
} = require('../../controllers/blogsControllers')

router.post('/', createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlogById)
router.put('/:id', putBlog)
router.delete('/:id', deleteBlog)

module.exports = router
