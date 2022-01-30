require('dotenv').config()
require('./mongo.js')


const http = require('http')
const express = require("express")

const restRouter = require('./controllers/restaurants.js')

const app = express()
const cors = require('cors')
const menuRouter = require('./controllers/menus.js')
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('----------')
  next()
}) 

app.get('/', (req, res) => {
    res.send('<h1>Api de Tu Restaurante</h1>')
})


app.use('/api/restaurantes', restRouter)
app.use('/api/menus', menuRouter)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) 
})