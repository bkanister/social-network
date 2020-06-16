import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from "./reducers/postsReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    profile: profileReducer,
    form: formReducer
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store