import {createRenderer} from "react-dom/test-utils";

const ADD_POST = 'ADD_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';
const DELETE_POST = 'DELETE_POST';

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

        default: return state
    }
}

export const addPostCreator = () => ({type: ADD_POST})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})
export const deletePostCreator = (postId) => ({type: DELETE_POST, postId})

export default reducers