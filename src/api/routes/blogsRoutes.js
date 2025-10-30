const express = require('express')
const router = express.Router()
const { createBlog } = require('../../controllers/blogsControllers')

router.post('/', createBlog)

module.exports = router
