const express = require('express')

const app = express()
app.use(express.json())

//Aqui importo las rutas
const blogRoutes = require('./src/api/routes/blogsRoutes')
const postRoutes = require('./src/api/routes/postsRoutes')

//Aqui uso las rutas
app.use('/api/blogs', blogRoutes)
app.use('/api/posts', postRoutes)

module.exports = app
