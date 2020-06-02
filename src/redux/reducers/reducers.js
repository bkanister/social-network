import {createRenderer} from "react-dom/test-utils";

const ADD_POST = 'ADD_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';
const DELETE_POST = 'DELETE_POST';
const DOWNLOAD_POSTS = 'DOWNLOAD_POSTS';
const DOWNLOAD_USERS = 'DOWNLOAD_USERS';

const initialState = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    users: [],
    posts: [],
    textareaValue: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                userId: 1,
                id: state.posts.length + 1,
                title: '',
                body: state.textareaValue
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
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
                return post.id !== action.postId;
            });
            return {
                ...state,
                posts: newPosts
            }
            
        case DOWNLOAD_POSTS:
            fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
                .then(response => response.json())
                .then(json => {
                    console.log('posts', json)
                    return {
                        ...state,
                        posts: json
                    }
                })

        case DOWNLOAD_USERS:
            fetch('https://randomuser.me/api/?results=5')
                .then(response => response.json())
                .then(json => {
                    console.log('users', json.results)
                    return {
                        ...state,
                        users: json.results
                    }
                })

        default: return state
    }
}

export const addPostCreator = () => ({type: ADD_POST})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})
export const deletePostCreator = (postId) => ({type: DELETE_POST, postId})
export const downloadUsersCreator = () => ({type: DOWNLOAD_USERS})
export const downloadPostsCreator = () => ({type: DOWNLOAD_POSTS})

export default reducers