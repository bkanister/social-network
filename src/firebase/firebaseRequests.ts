import {auth, firestore, storage} from "./firebase"
import { PostType } from "../redux/reducers/posts/types"
import {addPhotoToPostCreator} from "../redux/reducers/posts/postsReducer";
import {updateUserAvatarThunkAC} from "../redux/reducers/profile/profileReducer";
import store from '../redux/reduxStore'

export const getUserProfile = (dispatch: any, id: number) => {
    console.log('getUserProfile')
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).then((response) => {
    //     dispatch({type: 'SET_USER_PROFILE_INFO', payload: response.data})
    // })
}

export const sendPostToServerAndGetKey = {
    postKey: '',

    sendPost(newPost: PostType) {
        const postsCollection = firestore.collection('users').doc(auth.currentUser!.uid).collection('posts').doc()
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

export const deletePostFromServer = (postKey: string) => {
    firestore.collection("users").doc(auth.currentUser!.uid).collection('posts').doc(postKey)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        }).catch(
        function (error) {
            console.error("Error removing document: ", error);
        });
}


export const handleFireBaseImageUpload = (image: File, exactPath: string) => {
    const uploadTask = storage.ref(`${auth.currentUser!.uid}/images/${exactPath}/${image.name}`).put(image)
    uploadTask.on('state_changed',
        snapShot => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref(`${auth.currentUser!.uid}/images/${exactPath}/`).child(image.name).getDownloadURL()
                .then(fireBaseUrl => {
                    if (exactPath === 'profile') {
                        store.dispatch(updateUserAvatarThunkAC(fireBaseUrl))
                    }
                    if (exactPath === 'posts') {
                        store.dispatch(addPhotoToPostCreator(fireBaseUrl))
                    }
                })
        })
}