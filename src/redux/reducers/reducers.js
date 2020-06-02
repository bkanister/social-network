import {createRenderer} from "react-dom/test-utils";

const ADD_POST = 'ADD_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';
const DELETE_POST = 'DELETE_POST';
const DOWNLOAD_POSTS = 'DOWNLOAD_POSTS';
const DOWNLOAD_USERS = 'DOWNLOAD_USERS';

const initialState = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    users: [
        {
            name: {
                title: "Mr",
                first: "Gabriel",
                last: "Novak"
            },
            picture: {
                large: "https://randomuser.me/api/portraits/men/40.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/40.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/40.jpg"
            }
        },
        {
            name: {
                title: "Mr",
                first: "Emile",
                last: "White"
            },
            picture: {
                large: "https://randomuser.me/api/portraits/men/98.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/98.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/98.jpg"
            }
        },
        {
            name: {
                title: "Mademoiselle",
                first: "Selma",
                last: "Lefebvre"
            },
            picture: {
                large: "https://randomuser.me/api/portraits/women/13.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/13.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/13.jpg"
            }
        }
    ],
    posts: [
        {
            userId: 1,
            id: 1,
            body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            userId: 1,
            id: 2,
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            userId: 1,
            id: 3,
            body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
        },
    ],
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