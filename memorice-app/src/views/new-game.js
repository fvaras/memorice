import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '../configs'
import axios from 'axios'
import _ from 'lodash'

const NewGame = () => {
    const [tries, setTries] = useState(0)
    const [startTime, setStartTime] = useState(null)
    const [table, setTable] = useState([])

    const user = useSelector(state => state.user)

    const startNewGame = async () => {
        const { data } = await axios.get(`${API_URL}/images`)
        setTable(createTable(data))
        setStartTime(new Date())
    }

    const createTable = images => {
        let imageList = images.map((img, index) => (
            {
                url: img,
                visible: false
            }))
        imageList = imageList.concat(imageList)
        imageList = _.shuffle(imageList)
        console.log(imageList)
        return imageList
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-lg btn-success" onClick={startNewGame}>Start a new game</button>
            </div>

            <div className="row mt-5">
                {table.map((entry, index) => (
                    <div className="col-xs-3 col-sm-3" key={index}>
                        <img className="rounded card-img-top img-thumbnail img-fluid h-100" src={entry.url} alt="" />
                    </div>
                ))}
            </div>
        </>
    )
}

export default NewGame