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
    posts: [],
    textareaValue: '',
    postImage: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                key: '',
                id: state.posts.length + 1,
                body: state.textareaValue,
                img: state.postImage
            };
            axios.post('https://social-network-7c6c6.firebaseio.com/posts.json', newPost)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case INPUT_CHANGE:
            return {
                ...state,
                textareaValue: action.inputText
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post => {
                return post[0].key !== action.postKey;
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
                console.log('Object.entries', posts)
                return {
                    ...state,
                    posts
                }
            }
            return state

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


export const addPostCreator = (postKey) => ({type: ADD_POST, postKey})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})
export const deletePostCreator = (postKey) => ({type: DELETE_POST, postKey})
export const downloadUsersCreator = () => ({type: DOWNLOAD_USERS})
export const downloadPostsCreator = (posts) => ({type: DOWNLOAD_POSTS, posts})

export default reducers