import React from 'react'

const GameCard = ({ entry, onClick }) => {

    const { id, url, visible, completed, hasError } = entry

    const canSwap = !completed && !visible

    const handleClick = () => {
        if (canSwap)
            onClick(id)
    }

    return (
        <div
            className="col-xs-6 col-sm-4 col-md-3 animated fadeIn"
            style={canSwap ? { cursor: 'pointer' } : null}
            onClick={handleClick}
        >
            {visible ?
                (
                    <img className={['rounded card-img-top img-thumbnail img-fluid h-100', hasError ? 'card-error' : null].join(' ')}
                        src={url} alt=""
                    />
                ) : (
                    <img className="rounded card-img-top img-thumbnail img-fluid h-100"
                        src="https://cdn.pixabay.com/photo/2017/03/28/11/02/question-2181689__340.jpg" alt=""
                    />
                )}
        </div>
    )
}

export default GameCard