import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import { clearUser } from '../store/actions/user.actions'
import { useHistory } from "react-router-dom";

const NavBar = () => {

    const disptach = useDispatch()
    const history = useHistory();

    const user = useSelector(state => state.user)

    const logout = () => {
        console.log('logout')
        disptach(clearUser())
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">
                MEMORIZE GAME
                {user ?
                    <span className="ml-2">({user.name})</span>
                    : null}
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/user">User Name</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={['nav-link', user ? null : 'disabled'].join(' ')} to="/new-game">New game</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/ranking">Ranking</NavLink>
                    </li>
                </ul>
                {user ? (
                    <div className="d-flex">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <span className="nav-link"
                                    style={{ cursor: 'pointer' }}
                                    onClick={logout}
                                >Logout</span>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </nav>
    )
}

export default NavBar