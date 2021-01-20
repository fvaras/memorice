import React from 'react'
import {
    Switch,
    Route
} from "react-router-dom";
import Login from './views/login'
import NewGame from './views/game'
import Ranking from './views/ranking'

const Routes = () => (
    <Switch>
        <Route path="/user">
            <Login />
        </Route>
        <Route path="/new-game">
            <NewGame />
        </Route>
        <Route path="/ranking">
            <Ranking />
        </Route>
        <Route path="/">
            <Ranking />
        </Route>
    </Switch>
)
export default Routes