import React, { useState, useEffect } from 'react'
import { API_URL } from '../configs'
import axios from 'axios'

const Ranking = () => {

    useEffect(() => {
        getRanking()
    }, [])

    const getRanking = async () => {
        const { data } = await axios.get(`${API_URL}/game/ranking`)
        console.log(data)
    }

    return (
        <div>Ranking works</div>
    )
}

export default Ranking