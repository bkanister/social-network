import {
    ADD_PHOTO,
    ADD_POST,
    DELETE_POST,
    DOWNLOAD_POSTS
} from "../constants";
import {deletePostFromServer, sendPostToServerAndGetKey} from "../../../firebase/firebaseRequests";
import {firestore, auth} from "../../../firebase/firebase";
import {InitialStateType, ActionTypes, PostType} from "./types";
import {StoreType} from "../../reduxStore";
import {Dispatch} from "redux";


const initialState: InitialStateType = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    posts: [],
    textareaValue: '',
    postImage: '',
    postsAreLoading: false
}

const postsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                postImage: '',
                textareaValue: ''
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post => {
                return post.key !== action.payload;
            });
            return {
                ...state,
                posts: newPosts
            }

        case ADD_PHOTO:
            return {
                ...state,
                postImage: action.payload
            }

        case DOWNLOAD_POSTS:
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



export const addPostCreator = (newPost: PostType): ActionTypes  => ({type: ADD_POST, payload: newPost})
export const deletePostCreator = (postKey: string): ActionTypes => ({type: DELETE_POST, payload: postKey})
export const downloadPostsCreator = (posts: PostType[]): ActionTypes => ({type: DOWNLOAD_POSTS, payload: posts})
export const addPhotoToPostCreator = (fireBaseUrl: string): ActionTypes => ({type: ADD_PHOTO, payload: fireBaseUrl})

type DispatchType = Dispatch<ActionTypes>
type GetStateType = () => StoreType

export const getPostsThunkAC = () => {
    return (dispatch: DispatchType) => {
        // @ts-ignore
        firestore.collection("users").doc(auth.currentUser.uid).collection('posts').get()
            .then(function (querySnapshot) {
                let posts: any = [];
                querySnapshot.forEach(function (doc) {
                    posts.push(doc.data());
                });
                posts = posts.map((post: any) => Object.values(post))
                const merged = [].concat.apply([], posts);
                const sorted = merged.sort((a: PostType, b: PostType) => {
                    return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
                })
                dispatch(downloadPostsCreator(sorted))
            })
    }
}

export const deletePostThunkAC = (postKey: string) => (dispatch: DispatchType) => {
        deletePostFromServer(postKey)
        dispatch(deletePostCreator(postKey))
    }

export const addPostThunkAC = (postText: string) => (dispatch: DispatchType, getState: GetStateType) => {
        const newPost: PostType = {
            key: '',
            body: postText,
            img: getState().posts.postImage,
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        };
        sendPostToServerAndGetKey.sendPost(newPost)
        newPost.key = sendPostToServerAndGetKey.getPostKey.bind(sendPostToServerAndGetKey)()
        dispatch(addPostCreator(newPost))
}

export default postsReducer