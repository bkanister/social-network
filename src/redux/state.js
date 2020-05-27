import {rerenderEntireTree} from "../render";

    let state = {
    avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    users: [],
    posts: [
        {
            userId: 1,
            id: 1,
            title: '',
            body: 'first post'
        }
    ],
    textareaValue: ''
}

window.state = state


export const addNewPost = postText => {
    const newPost = {
        userId: 1,
        id: state.posts.length + 1,
        title: '',
        body: postText
    };
    state.posts.push(newPost);
    state.textareaValue = ''
    rerenderEntireTree(state)
};

export const changeInputHandler = (inputText) => {
    state.textareaValue = inputText;
    rerenderEntireTree(state)
}

export const deletePost = postId => {
    const oldPosts = [...state.posts];
    const newPosts = oldPosts.filter(post => {
        return post.id !== postId;
    })
    state.posts = newPosts;
    rerenderEntireTree(state)
}

export default state