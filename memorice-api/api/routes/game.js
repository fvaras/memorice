const express = require('express')
const router = express.Router()
const Game = require('../models/game')

router.get('/ranking', async (req, res) => {
    const lessFaults = await Game.find().sort('faults time').limit(10).exec()
    const bestTimes = await Game.find().sort('time faults').limit(10).exec()
    res.status(200).send({lessFaults, bestTimes})
})

router.get('/', async (req, res) => {
    const data = await Game.find().exec()
    res.status(200).send(data)
})

router.post('/', async (req, res) => {
    const result = await Game.create(req.body)
    res.status(201).send(result)
})

router.delete('/', async (req, res) => {
    const result = await Game.deleteMany()
    res.status(201).send(result)
})

module.exports = router