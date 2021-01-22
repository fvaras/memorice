import React, { useState, useEffect } from 'react'
import axios from '../services/axios'
import format from 'date-fns/format'

const Ranking = () => {

    const [ranking, setRanking] = useState(null)

    useEffect(() => {
        getRanking()
    }, [])

    const getRanking = async () => {
        const { data } = await axios.get('/game/ranking')
        console.log(data)
        setRanking(data)
    }

    const formatTime = time => {
        let dt = new Date(time)
        let offset = dt.getTimezoneOffset() * 60 * 1000;
        dt = new Date(time + offset)
        const formattedTime = format(dt, 'HH:mm:ss')
        if (formattedTime.startsWith('00'))
            return format(dt, 'mm:ss')
        return formattedTime
    }

    if (!ranking)
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    return (
        <div className="row">
            <div className="col-sm-12 col-md-6">
                <h4>Less Faults</h4>
                <table className="table table-striped table-borderless table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Faults</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.lessFaults.map((game, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{game.user}</td>
                                <td>{game.faults}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-sm-12 col-md-6">
                <h4>Best Times</h4>
                <table className="table table-striped table-borderless table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.bestTimes.map((game, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{game.user}</td>
                                <td>{formatTime(game.time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ranking