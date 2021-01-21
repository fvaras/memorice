import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/actions/user.actions'
import { useHistory } from "react-router-dom";

const Login = () => {

    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const history = useHistory();

    const submit = event => {
        event.preventDefault()
        dispatch(setUser({ name }))
        history.push('/new-game')
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card">
                <h5 className="card-header">Please enter your name</h5>
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputNickname" aria-describedby="nicknameHelp"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <div id="nicknameHelp" className="form-text">This name will appear in the ranking view</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Let's go!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login