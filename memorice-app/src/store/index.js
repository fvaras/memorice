import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user.reducer'
import imagesReducer from './reducers/images.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    images: imagesReducer
});

const store = createStore(rootReducer);

export default store
