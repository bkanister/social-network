import axios from 'axios'
import {
    ADD_PHOTO,
    ADD_POST,
    DELETE_POST,
    DOWNLOAD_POSTS,
    INPUT_CHANGE,
} from "./constants";
import {deletePostFromServer, sendPostToServerAndGetKey} from "../../firebase/firebaseRequests";

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
            const newPost = {
                key: '',
                body: state.textareaValue,
                img: state.postImage,
                date: new Date().toLocaleString()
            };
            sendPostToServerAndGetKey.sendPost(newPost)
            newPost.key = sendPostToServerAndGetKey.getPostKey.bind(sendPostToServerAndGetKey)()
            return {
                ...state,
                posts: [newPost, ...state.posts],
                postImage: '',
                textareaValue: ''
            }

        case INPUT_CHANGE:
            return {
                ...state,
                textareaValue: action.inputText
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post => {
                return post.key !== action.postKey;
            });
            deletePostFromServer(action.postKey)
            return {
                ...state,
                posts: newPosts
            }

        case ADD_PHOTO:
            console.log('add_photo', action.payload)
            return {
                ...state,
                postImage: action.payload
            }

        case DOWNLOAD_POSTS:
            if (action.posts) {
                return {
                    ...state,
                    posts: action.posts
                }
            }
            return state

        default: return state
    }
}


export const addPostCreator = () => ({type: ADD_POST})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})
export const deletePostCreator = (postKey) => ({type: DELETE_POST, postKey})
export const downloadPostsCreator = (posts) => ({type: DOWNLOAD_POSTS, posts})
export const addPhotoCreator = (fireBaseUrl) => ({type: ADD_PHOTO, payload: fireBaseUrl})

export default postsReducer