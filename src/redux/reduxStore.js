import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from "./reducers/postsReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store