const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';

const store = {
    _state: {
        avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
        users: [],
        posts: [],
        textareaValue: ''
    },

    getState() {
        return this._state
    },

    _callSubscriber() {
        console.log('rerender')
    },

    subscribe(observer) {
        console.log('subscribe');
        this._callSubscriber = observer
    },

    getUsers() {
        fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then(json => {
                this._state.users = json.results
                console.log(json.results)
            })
            .then(() => this._callSubscriber(this._state))
    },

    getPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
            .then(response => response.json())
            .then(json => {
                this._state.posts = json
            })
            .then(() => this._callSubscriber(this._state))
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost = {
                userId: 1,
                id: this._state.posts.length + 1,
                title: '',
                body: this._state.textareaValue
            };
            this._state.posts.push(newPost);
            this._state.textareaValue = '';
            this._callSubscriber(this._state)
        }
        else if (action.type === DELETE_POST) {
            const oldPosts = [...this._state.posts];
            const newPosts = oldPosts.filter(post => {
                return post.id !== action.postId;
            })
            this._state.posts = newPosts;
            this._callSubscriber(this._state)
        }
        else if (action.type === INPUT_CHANGE) {
            this._state.textareaValue = action.inputText;
            this._callSubscriber(this._state)
        }
    }
}

export const addPostCreator = () => ({type: ADD_POST})
export const deletePostCreator = (postId) => ({type: DELETE_POST, postId})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})

export default store