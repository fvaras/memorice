const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const imagesRouter = require('./routes/images')

const app = express()
const port = 3021

//middlewares
app.use(cors())
app.use(bodyParser.json())

// routes middlewares
app.use('/api/images', imagesRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})