import axios from "axios";
import {auth, firestore} from "./firebase"

export const getUserProfile = (dispatch, id) => {
    console.log('getUserProfile')
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then((response) => {
        dispatch({type: 'SET_USER_PROFILE_INFO', payload: response.data})
    })
}

export const sendPostToServerAndGetKey = {
    postKey: '',

    sendPost(newPost) {
        console.log('sendPostToServerAndGetKey send post')
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
        console.log('sendPostToServerAndGetKey get key')
        return this.postKey
    }
}

export const deletePostFromServer = (postKey) => {
    console.log('deletePostFromServer')
    firestore.collection("users").doc(auth.currentUser.uid).collection('posts').doc(postKey)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        }).catch(
        function (error) {
            console.error("Error removing document: ", error);
        });
}
