import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import GameCard from './game-card'
import format from 'date-fns/format'

const Game = ({ initialTable, ...props }) => {
    const [table, setTable] = useState([])
    const [tries, setTries] = useState(0)
    const [clearTry, setClearTry] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(null);
    const timeoutDisplayImageRef = useRef(null);
    const timeoutTicksRef = useRef(null);

    useEffect(() => {
        startNewGame()
    }, [initialTable])

    const startNewGame = () => {
        setTable(initialTable)
        clearTimeouts()
        resetGameData()
    }

    const clearTimeouts = async () => {
        clearTimeout(timeoutTicksRef.current);
        clearTimeout(timeoutDisplayImageRef.current);
    }

    const resetGameData = () => {
        setTries(0)
        setStartTime(new Date())
        setElapsedTime(0)
    }

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
        setTable(_table)
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


    const changeVisibility = id => {
        console.log('tries', tries)
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

        setTable(_table)

        if (uncompleted === 0)
            endGame()
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

    const endGame = async () => {
        clearTimeouts()

        props.endGame({
            tries: tries + 1,
            time: elapsedTime
        })
    }

    const formatTime = time => {
        let dt = new Date(time)
        let offset = dt.getTimezoneOffset() * 60 * 1000;
        dt = new Date(time + offset)
        return format(dt, 'HH:mm:ss')
    }

    return (
        <>
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



            <div className="row mt-5">
                {table.map(entry => (
                    <GameCard key={entry.id} entry={entry} onClick={changeVisibility} />
                ))}
            </div>
        </>
    )
}

export default Game