import axios from "axios";
import {downloadUsersCreator, usersAreLoadingCreator} from "../redux/reducers/usersReducer";
import {auth, firestore} from "./firebase"
import {setUserId} from "../redux/reducers/profileReducer";

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
    firestore.collection("users").doc(auth.currentUser.uid).collection('posts').doc(postKey)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        }).catch(
        function(error) {
            console.error("Error removing document: ", error);
        });
}
