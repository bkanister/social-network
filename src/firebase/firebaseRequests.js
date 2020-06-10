import axios from "axios";
import {downloadUsersCreator, usersAreLoadingCreator} from "../redux/reducers/usersReducer";
import {auth, firestore} from "./firebase"
import {downloadPostsCreator} from "../redux/reducers/postsReducer";

export const getUsers = (dispatch, currentPage) => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=100&page=${currentPage}`)
        .then((response) => {
            dispatch(usersAreLoadingCreator())
            return response
        })
        .then((response) => {
            dispatch(downloadUsersCreator(response.data));
        })
}

export const getPosts = (dispatch, id) => {
    firestore.collection("users").doc(id).collection('posts').get()
        .then(function(querySnapshot) {
            const posts = [];
            const postsArray = []
                querySnapshot.forEach(function(doc) {
                    posts.push(doc.data());
                });
                posts.forEach(post => {
                    postsArray.push(Object.values(post))
                })
                const merged = [].concat.apply([], postsArray);
                dispatch(downloadPostsCreator(merged))
    });
}

export const getUserProfile = (dispatch, id) => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then((response) => {
        dispatch({type: 'SET_USER_PROFILE_INFO', payload: response.data})
    })
}

export const sendPostToServerAndGetKey = {
    postKey: '',

    sendPost(newPost) {
        const postsCollection = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc()
        postsCollection.set({
            [postsCollection.id]: {
                ...newPost,
                key: postsCollection.id
            }
        })
        this.postKey = postsCollection.id
    },

    getPostKey() {
        return this.postKey
    }
}


export const deletePostFromServer = (postKey) => {
    axios.delete(`https://social-network-7c6c6.firebaseio.com/posts/${postKey}.json`)
        .then((response) => console.log(response))
        .catch(error => console.log(error))
}