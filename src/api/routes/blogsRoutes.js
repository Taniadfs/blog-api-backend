const express = require('express')
const router = express.Router()
const {
  createBlog,
  getAllBlogs,
  getBlogById
} = require('../../controllers/blogsControllers')

router.post('/', createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlogById)

module.exports = router
