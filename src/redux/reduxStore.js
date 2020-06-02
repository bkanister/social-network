import {createStore} from "redux";
import reducer from "./reducers/reducers";

let store = createStore(reducer)

export const getUsers = () => {
    fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(json => {
            this._state.users = json.results
        })
        .then(() => this._callSubscriber(this._state))
}

export const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then(response => response.json())
        .then(json => {
            this._state.posts = json
        })
        .then(() => this._callSubscriber(this._state))
}

export default store