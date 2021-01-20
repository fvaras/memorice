import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand" href="#">MEMORICE GAME</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/user">User Name <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className={['nav-link', 'disabled'].join(' ')} to="/new-game">New game</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ranking">Ranking</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar