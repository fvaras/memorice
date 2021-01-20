const express = require('express')
const { random } = require('lodash')
const router = express.Router()
const _ = require('lodash')

const imagesList = [
    'https://cdn.pixabay.com/photo/2012/10/25/23/52/wolf-62898__340.jpg',
    'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
    'https://cdn.pixabay.com/photo/2013/03/20/23/20/butterfly-95364__340.jpg',
    'https://cdn.pixabay.com/photo/2013/05/24/17/21/jellyfish-113384__340.jpg',
    'https://cdn.pixabay.com/photo/2017/02/07/11/45/eagle-2045655__340.jpg',
    'https://cdn.pixabay.com/photo/2012/03/01/00/28/animal-19621__340.jpg',
    'https://cdn.pixabay.com/photo/2012/02/27/15/35/lion-17337__340.jpg',
    'https://cdn.pixabay.com/photo/2012/03/04/00/08/safari-21772__340.jpg',
    'https://cdn.pixabay.com/photo/2013/12/23/19/48/chameleon-233095__340.jpg',
    'https://cdn.pixabay.com/photo/2015/02/28/15/48/monkey-653705__340.jpg',
    'https://cdn.pixabay.com/photo/2020/11/24/17/54/dog-5773397__340.jpg',
    'https://cdn.pixabay.com/photo/2012/11/28/01/42/animal-67488__340.jpg',
]

router.get('/', (req, res) => {
    const randomList = _.sampleSize(imagesList, 6)
    res.status(200).send(randomList)
})

module.exports = router