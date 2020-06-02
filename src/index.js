import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/reduxStore";


const rerenderEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={store.getState()}
                 dispatch={store.dispatch.bind(store)}
                 // getUsers={getUsers.bind(store)}
                 // getPosts={getPosts.bind(store)}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store);

store.subscribe(() => rerenderEntireTree(store.getState()))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
