import { SET_USER } from '../actions/user.actions'

// const initialState = {
//     name: 'Fernando'
// }
const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.user
            }
        default: return state
    }
}