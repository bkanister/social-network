import axios from 'axios'
import {
    ADD_PHOTO,
    ADD_POST,
    DELETE_POST,
    DOWNLOAD_POSTS,
    DOWNLOAD_USERS,
    INPUT_CHANGE,
    SET_CURRENT_PAGE_NUMBER, USERS_ARE_LOADING
} from "./constants";

const initialState = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    users: [],
    posts: [],
    textareaValue: '',
    postImage: '',
    currentFriendsPageNumber: 1,
    usersAreLoading: false,
    postsAreLoading: false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                key: Math.random(),
                body: state.textareaValue,
                img: state.postImage,
                date: new Date().toLocaleString()
            };
            axios.post('https://social-network-7c6c6.firebaseio.com/posts.json', newPost)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
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
            debugger
            const newPosts = state.posts.filter(post => {
                return post.key !== action.postKey;
            });
            axios.delete(`https://social-network-7c6c6.firebaseio.com/posts/${action.postKey}.json`)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
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
                let posts = Object.entries(action.posts)
                posts.forEach(post => {
                    post[1]['key'] = post[0]
                    post.splice(0,1)
                    post = post[0]
                })
                const merged = [].concat.apply([], posts);
                return {
                    ...state,
                    posts: merged.reverse()
                }
            }
            return state

        case SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentFriendsPageNumber: action.pageNumber
            }

        case DOWNLOAD_USERS:
                return {
                    ...state,
                    users: action.users,
                    usersAreLoading: false
                }

        case USERS_ARE_LOADING:
            return {
                ...state,
                usersAreLoading: action.usersAreLoading
            }

        default: return state
    }
}


export const addPostCreator = (postKey) => ({type: ADD_POST, postKey})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})
export const deletePostCreator = (postKey) => ({type: DELETE_POST, postKey})
export const downloadUsersCreator = (users) => ({type: DOWNLOAD_USERS, users})
export const usersAreLoadingCreator = (usersAreLoading) => ({type: 'USERS_ARE_LOADING', usersAreLoading})
export const downloadPostsCreator = (posts) => ({type: DOWNLOAD_POSTS, posts})
export const setCurrentPageNumberCreator = (pageNumber) => ({type: SET_CURRENT_PAGE_NUMBER, pageNumber})

export default reducers