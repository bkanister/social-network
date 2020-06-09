import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from "./reducers/postsReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    profile: profileReducer
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store