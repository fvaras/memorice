const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.send('agregar nuevo juego')
})

router.get('/ranking', (req, res) => {
    res.send('get ranking')
})

module.exports = router