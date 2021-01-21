const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const imagesRouter = require('./routes/images')
const gameRouter = require('./routes/game')

const app = express()
const port = 3021

//middlewares
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// routes middlewares
app.use('/api/images', imagesRouter)
app.use('/api/game', gameRouter)

if (process.env.NODE_ENV === "development")
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app