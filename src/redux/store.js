import postsReducer from "./reducers/postsReducer";
import newPostCreatorReducer from "./reducers/newPostCreatorReducer";


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
        newPostCreatorReducer(this._state, action)
        postsReducer(this._state, action);
        this._callSubscriber(this._state)
    }
}



export default store