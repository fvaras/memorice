const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = mongoose.model('game', new Schema({
    user: String,
    faults: Number,
    time: Number
}))

module.exports = Game