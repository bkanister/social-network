import {
    ADD_PHOTO,
    ADD_POST,
    DELETE_POST,
    DOWNLOAD_POSTS,
    INPUT_CHANGE,
} from "./constants";
import {deletePostFromServer, sendPostToServerAndGetKey} from "../../firebase/firebaseRequests";
import {firestore, auth} from "../../firebase/firebase";

const initialState = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    posts: [],
    textareaValue: '',
    postImage: '',
    postsAreLoading: false
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            console.log('ADD_POST')
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                postImage: '',
                textareaValue: ''
            }

        case DELETE_POST:
            console.log('DELETE_POST')
            const newPosts = state.posts.filter(post => {
                return post.key !== action.payload;
            });
            return {
                ...state,
                posts: newPosts
            }

        case ADD_PHOTO:
            console.log('ADD_PHOTO')
            return {
                ...state,
                postImage: action.payload
            }

        case DOWNLOAD_POSTS:
            console.log('DOWNLOAD_POSTS')
            if (action.payload) {
                return {
                    ...state,
                    posts: action.payload
                }
            }
            return state

        default: return state
    }
}


export const addPostCreator = (newPost) => ({type: ADD_POST, payload: newPost})
export const deletePostCreator = (postKey) => ({type: DELETE_POST, payload: postKey})
export const downloadPostsCreator = (posts) => ({type: DOWNLOAD_POSTS, payload: posts})
export const addPhotoCreator = (fireBaseUrl) => ({type: ADD_PHOTO, payload: fireBaseUrl})

export const getPostsThunkAC = () => {
    console.log('getPostsThunkAC')
    return (dispatch) => {
        firestore.collection("users").doc(auth.currentUser.uid).collection('posts').get()
            .then(function (querySnapshot) {
                let posts = [];
                querySnapshot.forEach(function (doc) {
                    posts.push(doc.data());
                });
                posts = posts.map(post => Object.values(post))
                const merged = [].concat.apply([], posts);
                const sorted = merged.sort((a, b) => {
                    return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
                })
                dispatch(downloadPostsCreator(sorted))
            })
    }
}

export const deletePostThunkAC = (postKey) => {
    console.log('deletePostThunkAC')
    return (dispatch) => {
        deletePostFromServer(postKey)
        dispatch(deletePostCreator(postKey))
    }
}

export const addPostThunkAC = (postText) => (dispatch, getState) => {
        const newPost = {
            key: '',
            body: postText,
            img: getState().posts.postImage,
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        };
        sendPostToServerAndGetKey.sendPost(newPost)
        sendPostToServerAndGetKey.addUser()
        newPost.key = sendPostToServerAndGetKey.getPostKey.bind(sendPostToServerAndGetKey)()
        dispatch(addPostCreator(newPost))
}

export default postsReducer