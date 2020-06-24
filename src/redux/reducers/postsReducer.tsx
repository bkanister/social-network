import {
    ADD_PHOTO,
    ADD_POST,
    DELETE_POST,
    DOWNLOAD_POSTS,
    INPUT_CHANGE,
} from "./constants";
import {deletePostFromServer, sendPostToServerAndGetKey} from "../../firebase/firebaseRequests";
import {firestore, auth} from "../../firebase/firebase";

type InitialStateType = {
    avatar: string
    posts: Array<PostType>
    textareaValue: string
    postImage: string
    postsAreLoading: boolean
}
type PostType = {
    key: string | undefined
    body: string
    img: string | undefined
    date: string
    timestamp: number
}

const initialState: InitialStateType = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    posts: [],
    textareaValue: '',
    postImage: '',
    postsAreLoading: false
}

const postsReducer = (state = initialState, action: any) => {
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

type AddPostCreatorType = (newPost: PostType) => ({type: typeof ADD_POST, payload: PostType})
export const addPostCreator: AddPostCreatorType = (newPost: PostType) => ({type: ADD_POST, payload: newPost})

type DeletePostCreatorType = (postKey: string) => ({type: typeof DELETE_POST, payload: string})
export const deletePostCreator: DeletePostCreatorType = (postKey: string) => ({type: DELETE_POST, payload: postKey})

type DownloadPostsCreatorType = (posts: Array<PostType>) => ({type: typeof DOWNLOAD_POSTS, payload: Array<PostType>})
export const downloadPostsCreator: DownloadPostsCreatorType = (posts: Array<PostType>) => ({type: DOWNLOAD_POSTS, payload: posts})

type AddPhotoCreatorType = (fireBaseUrl: string) => ({type: typeof ADD_PHOTO, payload: string})
export const addPhotoCreator: AddPhotoCreatorType = (fireBaseUrl: string) => ({type: ADD_PHOTO, payload: fireBaseUrl})

export const getPostsThunkAC = () => {
    return (dispatch: any) => {
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

export const deletePostThunkAC = (postKey: string) => {
    return (dispatch: any) => {
        deletePostFromServer(postKey)
        dispatch(deletePostCreator(postKey))
    }
}

export const addPostThunkAC = (postText: string) => (dispatch: any, getState: any) => {
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