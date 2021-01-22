import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setImages } from '../store/actions/images.actions'
import axios from '../services/axios'
import _ from 'lodash'
import Game from '../components/game'
import Loading from '../components/loading'
import { useHistory } from "react-router-dom";

const NewGame = () => {

    const [loading, setLoading] = useState(false)
    const [table, setTable] = useState(null)
    const [completed, setCompleted] = useState(false)

    const history = useHistory();

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const imageList = useSelector(state => state.images)


    const startNewGame = async () => {
        setCompleted(false)
        if (imageList) {
            setTable(createTable(getRandomImages(imageList)))
        }
        else {
            setLoading(true)
            const { data } = await axios.get('/images')
            dispatch(setImages(data))
            setTable(createTable(getRandomImages(data)))
            setLoading(false)
        }
    }

    const getRandomImages = collection => {
        return _.sampleSize(collection, 6)
    }

    const createTable = images => {
        let imageList = images.map(img => (
            {
                url: img,
                visible: false,
                completed: false,
                hasError: false
            }))
        imageList = imageList.concat(_.cloneDeep(imageList))
        imageList = _.shuffle(imageList)
        imageList.forEach((entry, i) => {
            entry.id = i + 1
        });
        return imageList
    }

    const endGame = async (payload) => {
        setCompleted(true)

        await axios.post('/game', {
            ...payload,
            user: user.name,
        })

        setTimeout(() => {
            history.push('/ranking')
        }, 6000)
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-lg btn-success" onClick={startNewGame}>Start a new game</button>
                {/* <button type="button" className="btn btn-lg btn-success" onClick={endGame}>End game</button> */}
            </div>

            {loading ? (
                <Loading />
            ) : null}

            { completed ? (
                <div className="alert alert-success mt-5 animated fadeIn" role="alert">
                    Congratulations! You have completed the game. Briefly you'll be redirected to ranking
                </div>
            ) : null}

            {!loading && table ? (
                <Game initialTable={table} endGame={endGame} />
            ) : null}
        </>
    )
}

export default NewGame
