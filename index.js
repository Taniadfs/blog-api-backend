require('dotenv').config()
const app = require('./app.js')
const connectDB = require('./src/config/db.js')

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
