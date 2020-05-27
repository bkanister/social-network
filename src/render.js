import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addNewPost, deletePost, changeInputHandler} from "./redux/state";

export const rerenderEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addNewPost={addNewPost} deletePost={deletePost} changeInputHandler={changeInputHandler}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
