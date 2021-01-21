import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '../configs'
import axios from 'axios'
import _ from 'lodash'
import GameCard from '../components/game-card'
import format from 'date-fns/format'
import { useHistory } from "react-router-dom";

const NewGame = () => {
    const [tries, setTries] = useState(0)
    const [table, setTable] = useState([])
    const [clearTry, setClearTry] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(null);
    const [completed, setCompleted] = useState(false)
    const timeoutDisplayImageRef = useRef(null);
    const timeoutTicksRef = useRef(null);

    const user = useSelector(state => state.user)

    const history = useHistory();

    // This is from internet, St Google
    useEffect(() => {
        if (timeoutDisplayImageRef.current !== null)
            clearTimeout(timeoutDisplayImageRef.current);

        if (!clearTry)
            return

        timeoutDisplayImageRef.current = setTimeout(() => {
            timeoutDisplayImageRef.current = null;
            if (clearTry) {
                setClearTry(false)
                clearCurrentTry()
            }
        }, 1500);
    }, [clearTry]);

    const clearCurrentTry = () => {
        const _table = [...table]
        const uncompletedVisibles = getUncompletedVisibles(_table)
        uncompletedVisibles.forEach(entry => {
            entry.visible = false
        });
        setTable(() => _table)
    }

    // This is from internet, St Google
    useEffect(() => {
        if (timeoutTicksRef.current !== null)
            clearTimeout(timeoutTicksRef.current);

        if (startTime === null)
            return

        // .. 👇 get the timeout ID to clear on unmount
        timeoutTicksRef.current = setTimeout(() => {
            timeoutTicksRef.current = null;
            const now = new Date()
            const _elapsedTime = now.getTime() - startTime.getTime()
            setElapsedTime(_elapsedTime);
        }, 1000);

        // // ... 👇 Clean up here with the ID on unmount
        // return () => clearTimeout(timeoutTicksRef);
    }, [elapsedTime]);

    const startNewGame = async () => {
        clearCurrentGame()
        const { data } = await axios.get(`${API_URL}/images`)
        setTable(createTable(data))
        setTries(0)
        setStartTime(new Date())
        setElapsedTime(0)
    }

    const createTable = images => {
        let imageList = images.map(img => (
            {
                url: img,
                visible: false,
                completed: false
            }))
        imageList = imageList.concat(_.cloneDeep(imageList))
        imageList = _.shuffle(imageList)
        imageList.forEach((entry, i) => {
            entry.id = i + 1
        });
        return imageList
    }

    const changeVisibility = id => {
        const _table = [...table]
        const _entry = _table.filter(p => p.id === id)[0]

        const canSwapEntry = canSwap(_entry)
        if (!canSwapEntry)
            return

        _entry.visible = true
        // const uncompletedVisibles = _table.filter(p => p.visible && !p.completed)
        const uncompletedVisibles = getUncompletedVisibles(_table)
        if (uncompletedVisibles.length === 2) {
            setTries(prev => prev + 1)
            const isMatch = uncompletedVisibles[0].url === uncompletedVisibles[1].url

            uncompletedVisibles[0].completed = isMatch
            uncompletedVisibles[1].completed = isMatch

            if (!isMatch)
                setClearTry(true)
        }

        const uncompleted = _table.filter(p => !p.completed).length
        if (uncompleted === 0)
            endGame()

        setTable(_table)
    }

    const canSwap = ({ id, completed }) => {
        if (completed) {
            return false
        }
        const uncompletedVisibles = getUncompletedVisibles(table)
        if (uncompletedVisibles.length >= 2)
            return false

        return true
    }

    const getUncompletedVisibles = table => {
        return table.filter(p => p.visible && !p.completed)
    }


    const clearCurrentGame = async () => {
        clearTimeout(timeoutTicksRef.current);
        clearTimeout(timeoutDisplayImageRef.current);
        setCompleted(false)
    }

    const endGame = async () => {
        clearCurrentGame()
        setCompleted(true)

        const { data } = await axios.post(`${API_URL}/game`)
        console.log(data)

        setTimeout(() => {
            history.push('/ranking')
        }, 6000)
    }

    const formatTime = time => {
        let dt = new Date(time)
        let offset = dt.getTimezoneOffset() * 60 * 1000;
        dt = new Date(time + offset)
        return format(dt, 'HH:mm:ss')
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-lg btn-success" onClick={startNewGame}>Start a new game</button>
                <button type="button" className="btn btn-lg btn-success" onClick={endGame}>End game</button>
            </div>


            {/* {elapsedTime ? (
                <div className="row mt-5">
                    <h6>Tries: {tries}</h6>
                    <h6>Elapsed Time: {formatTime(elapsedTime)}</h6>
                </div>
            ) : null} */}

            {elapsedTime && !completed ? (
                <div className="alert alert-primary mt-5" role="alert">
                    <div className="d-flex justify-content-around">
                        <div>
                            <span className="font-weight-bold mr-1">Tries:</span>
                            <span className="font-weight-normal">{tries}</span>
                        </div>
                        <div>
                            <span className="font-weight-bold mr-1">Elapsed Time:</span>
                            <span className="font-weight-normal">{formatTime(elapsedTime)}</span>
                        </div>
                    </div>
                </div>
            ) : null}

            {completed ? (
                <div className="alert alert-success mt-5" role="alert">
                    Congratulations! You have completed the game. Briefly you'll be redirected to ranking
                </div>
            ) : null}

            <div className="row mt-5">
                {table.map(entry => (
                    // <GameCard key={entry.id} entry={entry} onClick={() => changeVisibility(entry.id)} />
                    <GameCard key={entry.id} entry={entry} onClick={changeVisibility} />
                ))}
            </div>
        </>
    )
}

export default NewGame
