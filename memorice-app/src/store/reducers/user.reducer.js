import { SET_USER, CLEAR_USER } from '../actions/user.actions'

const initialState = null
// const initialState = {
//     name: 'Fernando'
// }

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.user
            }
        case CLEAR_USER:
            return null
        default: return state
    }
}