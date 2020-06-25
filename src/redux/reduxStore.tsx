import {createStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from "./reducers/posts/postsReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profile/profileReducer";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    profile: profileReducer,
    form: formReducer
})

export type StoreType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store