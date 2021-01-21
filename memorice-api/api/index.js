const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const imagesRouter = require('./routes/images')
const gameRouter = require('./routes/game')

const app = express()
const port = 3021

//middlewares
app.use(cors())
app.use(bodyParser.json())

// routes middlewares
app.use('/api/images', imagesRouter)
app.use('/api/game', gameRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})