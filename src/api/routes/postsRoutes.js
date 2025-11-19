const express = require('express')
const router = express.Router()
const {
  createPost,
  getAllPosts,
  getPostById,
  putPost,
  deletePost
} = require('../controllers/postsControllers')

router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.put('/:id', putPost)
router.delete('/:id', deletePost)

module.exports = router
