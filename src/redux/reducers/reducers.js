import {createRenderer} from "react-dom/test-utils";
import axios from 'axios'

const ADD_POST = 'ADD_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';
const DELETE_POST = 'DELETE_POST';
const ADD_PHOTO = 'ADD_PHOTO';
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
    textareaValue: '',
    postImage: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                userId: 1,
                id: state.posts.length + 1,
                title: '',
                body: state.textareaValue,
                img: state.postImage
            };
            axios.post('https://social-network-7c6c6.firebaseio.com/posts.json', newPost)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
            return {
                ...state,
                posts: [...state.posts, newPost],
                textareaValue: '',
                postImage: ''
            }

        case INPUT_CHANGE:
            return {
                ...state,
                textareaValue: action.inputText
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post => {
                return post.id !== action.postId;
            });
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
            axios.get('https://social-network-7c6c6.firebaseio.com/posts.json')
                .then(response => {
                    // const arr = []
                    // Object.keys(response.data).forEach((key, index) => {
                    //     arr.push({
                    //         id: key,
                    //         name: `Post #${index}`
                    //     })
                    // })
                    console.log(response.data)
                    return {
                        ...state,
                        posts: Array.from(response.data)
                    }
            })

        case DOWNLOAD_USERS:
            fetch('https://randomuser.me/api/?results=5')
                .then(response => response.json())
                .then(json => {
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
export const addPhotoCreator = (image) => ({type: ADD_PHOTO, payload: image})
export const downloadUsersCreator = () => ({type: DOWNLOAD_USERS})
export const downloadPostsCreator = () => ({type: DOWNLOAD_POSTS})

export default reducers