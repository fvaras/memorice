import { SET_IMAGES } from '../actions/images.actions'

const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return [...action.imageList]
        default: return state
    }
}